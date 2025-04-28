"use client"

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getAllPoses, getPose } from './boneActions';

const SimpleHumanModel = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const modelRef = useRef<THREE.Object3D | null>(null);
    const bonesRef = useRef<{ [key: string]: THREE.Bone }>({});
    const [poses, setPoses] = useState<Array<{ name: string }>>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [, setCurrentPoseIndex] = useState(0);
    const isPlayingRef = useRef(false);
    const [displayText, setDisplayText] = useState('');

    // Load pose animation function
    const loadPose = async (poseName: string) => {
        try {
            const result = await getPose(poseName);
            if (result.success && result.pose?.boneStates) {
                return new Promise<void>((resolve) => {
                    const initialStates = Object.entries(bonesRef.current).map(([name, bone]) => ({
                        name,
                        x: bone.rotation.x,
                        y: bone.rotation.y,
                        z: bone.rotation.z
                    }));

                    if (!result.pose) return;

                    const targetStates = result.pose.boneStates.map(state => ({
                        name: state.boneName,
                        x: THREE.MathUtils.degToRad(state.rotationX),
                        y: THREE.MathUtils.degToRad(state.rotationY),
                        z: THREE.MathUtils.degToRad(state.rotationZ)
                    }));

                    const duration = 500;
                    const startTime = Date.now();

                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        const eased = progress < 0.5
                            ? 4 * progress * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                        targetStates.forEach(target => {
                            const bone = bonesRef.current[target.name];
                            const initial = initialStates.find(state => state.name === target.name);

                            if (bone && initial) {
                                bone.rotation.x = initial.x + (target.x - initial.x) * eased;
                                bone.rotation.y = initial.y + (target.y - initial.y) * eased;
                                bone.rotation.z = initial.z + (target.z - initial.z) * eased;
                                bone.updateMatrix();
                            }
                        });

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            resolve();
                        }
                    };

                    requestAnimationFrame(animate);
                });
            }
        } catch (error) {
            console.error('Error loading pose:', error);
        }
    };

    // Play sequence function with video sync
    const playPoseSequence = async (poseNames: string[]) => {
        setIsPlaying(true);
        isPlayingRef.current = true;

        // Start video playback with error handling
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            try {
                await videoRef.current.play();
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Video playback error:', error);
                }
            }
        }

        try {
            for (let i = 0; i < poseNames.length; i++) {
                if (!isPlayingRef.current) break;

                setCurrentPoseIndex(i);
                const result = await getPose(poseNames[i]);
                
                if (result.success && result.pose) {
                    await loadPose(result.pose.name);
                    await new Promise(resolve => setTimeout(resolve, 1));
                }
            }
        } catch (error) {
            console.error('Error in pose sequence:', error);
        }

        setIsPlaying(false);
        setCurrentPoseIndex(0);
        setDisplayText('');

        // Stop video with error handling
        if (videoRef.current) {
            try {
                videoRef.current.pause();
            } catch (error) {
                console.error('Error pausing video:', error);
            }
        }
    };

    const stopPoseSequence = () => {
        isPlayingRef.current = false;
        setIsPlaying(false);
        setDisplayText('');

        // Stop video with error handling
        if (videoRef.current) {
            try {
                videoRef.current.pause();
            } catch (error) {
                console.error('Error pausing video:', error);
            }
        }
    };

    // Load poses
    useEffect(() => {
        const fetchPoses = async () => {
            const result = await getAllPoses();
            if (result.success) {
                setPoses(result.poses);
            }
        };
        fetchPoses();
    }, []);

    // Setup 3D scene
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        sceneRef.current = scene;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 1.5, 4);
        camera.lookAt(0, 1.5, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const frontLight = new THREE.DirectionalLight(0xffffff, 4);
        frontLight.position.set(0, 2, 4);
        scene.add(frontLight);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
        fillLight.position.set(0, 0, 2);
        scene.add(fillLight);

        // Load model
        const loader = new GLTFLoader();
        loader.load(
            '/3d/human_character.glb',
            (gltf) => {
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                const scale = 2 / size.y;
                gltf.scene.scale.setScalar(scale);

                gltf.scene.position.x = -center.x * scale;
                gltf.scene.position.y = -center.y * scale + 1.5;
                gltf.scene.position.z = -center.z * scale;

                modelRef.current = gltf.scene;
                scene.add(gltf.scene);

                const bones: { [key: string]: THREE.Bone } = {};
                gltf.scene.traverse((object) => {
                    if ((object as THREE.Bone).isBone) {
                        const bone = object as THREE.Bone;
                        bones[bone.name] = bone;
                        bone.rotation.order = 'XYZ';
                        bone.updateMatrix();
                    }
                });
                bonesRef.current = bones;
            },
            undefined,
            (error) => console.error('Error:', error)
        );

        const handleResize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="flex h-full">
            {/* Video Player */}
            <div className="w-1/2 h-full bg-black flex items-center justify-center">
                <video
                    ref={videoRef}
                    className="h-full w-full object-contain"
                    src="/videos/video_sample.mp4"
                    playsInline
                    muted
                >
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Model Viewer and Controls */}
            <div className="w-1/2 bg-white flex">
                <div ref={containerRef} className="w-3/4 h-full" />

                {/* Sequence Controls */}
                <div className="w-1/4 border-l border-gray-200 p-4">
                    <button
                        onClick={() => {
                            if (!isPlaying) {
                                const desiredSequence = ['le', "t's", "lo", "ok", "A", "R", "ju", "st", "60", "sec", "onds", "music", "A", "R", "mean", "overlay", "ing", "digi", "tal", "images", "re", "al", "world", "en", "han", "ce", "digi", "tal", "deta", "ils"];
                                const matchingPoses = desiredSequence.filter(name =>
                                    poses.some(pose => pose.name === name)
                                );
                                playPoseSequence(matchingPoses);
                            } else {
                                stopPoseSequence();
                            }
                        }}
                        className={`w-full px-4 py-2 ${isPlaying
                                ? 'bg-pink-600 hover:bg-pink-700'
                                : 'bg-pink-500 hover:bg-pink-600'
                            } text-white rounded-lg`}
                    >
                        {isPlaying ? 'Stop Sequence' : 'Play Sequence'}
                    </button>

                    {displayText && (
                        <div className="mt-4 text-xl font-bold text-center text-gray-800">
                            {displayText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimpleHumanModel; 
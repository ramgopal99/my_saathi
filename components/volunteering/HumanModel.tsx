/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { boneGroups } from '@/config/boneConfig';
import { savePose, saveBoneRotation, getAllPoses, getPose } from './boneActions';



const HumanModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const bonesRef = useRef<{ [key: string]: THREE.Bone }>({});
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [selectedSubgroup, setSelectedSubgroup] = useState<string>('');
  const [selectedBone, setSelectedBone] = useState<string>('');
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [poseName, setPositionName] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [poses, setPoses] = useState<Array<{ name: string }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const isPlayingRef = useRef(false);
  const [displayText, setDisplayText] = useState('');

  // Function to get all available groups
  const getAvailableGroups = () => {
    return Object.keys(boneGroups).sort((a, b) => {
      // Custom sort order for better organization
      const order = ['Head', 'Torso', 'Arms', 'Right Hand', 'Left Hand', 'Legs'];
      return order.indexOf(a) - order.indexOf(b);
    });
  };

  // Function to get all subgroups for a group
  const getAvailableSubgroups = (group: string) => {
    return Object.keys(boneGroups[group] || {});
  };

  // Function to get bones for selection, modified to handle all bones in a subgroup
  const getBonesForSelection = (): string[] => {
    if (!selectedGroup || !selectedSubgroup) return [];
    const bones = boneGroups[selectedGroup]?.[selectedSubgroup]?.bones || [];
    return bones;
  };

  // Function to get limits for current selection
  const getCurrentLimits = () => {
    if (!selectedGroup || !selectedSubgroup) return null;
    return boneGroups[selectedGroup]?.[selectedSubgroup]?.limits;
  };

  // Modified to handle bone rotation with proper limits
  const handleBoneRotation = (axis: 'x' | 'y' | 'z', value: string) => {
    const limits = getCurrentLimits();
    if (!limits || !selectedBone) return;

    const newValue = Math.min(
      Math.max(
        parseFloat(value),
        limits[axis].min
      ),
      limits[axis].max
    );

    // Update rotation state
    setRotation(prev => ({ ...prev, [axis]: newValue }));

    // Apply rotation to the bone
    const bone = bonesRef.current[selectedBone];
    if (bone) {
      const radians = THREE.MathUtils.degToRad(newValue);
      
      // Set rotation based on axis
      switch(axis) {
        case 'x':
          bone.rotation.x = radians;
          break;
        case 'y':
          bone.rotation.y = radians;
          break;
        case 'z':
          bone.rotation.z = radians;
          break;
      }
      
      // Ensure proper rotation order
      bone.rotation.order = 'XYZ';
      bone.updateMatrix();
    }
  };

  // Move getCurrentBoneRotation outside of the component or use useCallback
  const getCurrentBoneRotation = useCallback((bone: THREE.Bone | undefined) => {
    if (!bone) {
      return { x: 0, y: 0, z: 0 };
    }
    
    return {
      x: THREE.MathUtils.radToDeg(bone.rotation.x),
      y: THREE.MathUtils.radToDeg(bone.rotation.y),
      z: THREE.MathUtils.radToDeg(bone.rotation.z)
    };
  }, []); // No dependencies needed since it's a pure function

  // Update the useEffect to use the memoized function
  useEffect(() => {
    if (selectedBone) {
      const bone = bonesRef.current[selectedBone];
      const currentRotation = getCurrentBoneRotation(bone);
      setRotation(currentRotation);
    }
  }, [selectedBone, getCurrentBoneRotation]); // Add getCurrentBoneRotation to dependencies

  // Reset rotation for single bone
  const handleResetRotation = () => {
    if (!selectedBone) return;
    
    setRotation({ x: 0, y: 0, z: 0 });
    const bone = bonesRef.current[selectedBone];
    if (bone) {
      bone.rotation.set(0, 0, 0);
    }
  };

  const handleSaveCurrentPose = async () => {
    if (!poseName) {
      setSaveStatus('Please enter a pose name');
      setTimeout(() => setSaveStatus(''), 1000); // Clear message after 1 second
      return;
    }

    // Collect all bone rotations
    const boneStates = Object.entries(bonesRef.current).map(([name, bone]) => ({
      name,
      x: THREE.MathUtils.radToDeg(bone.rotation.x),
      y: THREE.MathUtils.radToDeg(bone.rotation.y),
      z: THREE.MathUtils.radToDeg(bone.rotation.z)
    }));

    try {
      const result = await savePose(poseName, boneStates);
      setSaveStatus(result.success ? 'Pose saved successfully!' : 'Failed to save pose');
      // Clear status message after 1 second
      setTimeout(() => setSaveStatus(''), 1000);
    } catch (error) {
      setSaveStatus('Error saving pose');
      // Clear error message after 1 second
      setTimeout(() => setSaveStatus(''), 1000);
    }
  };

  const handleSaveCurrentBone = async () => {
    if (!selectedBone) return;
    
    try {
      const result = await saveBoneRotation(
        selectedBone,
        rotation.x,
        rotation.y,
        rotation.z
      );
      setSaveStatus(result.success ? 'Bone position saved!' : 'Failed to save bone position');
    } catch (error) {
      setSaveStatus('Error saving bone position');
    }
  };

  const loadPose = async (poseName: string) => {
    try {
      const result = await getPose(poseName);
      if (result.success && result.pose?.boneStates) {
        return new Promise<void>((resolve) => {
          // Store initial rotations
          const initialStates = Object.entries(bonesRef.current).map(([name, bone]) => ({
            name,
            x: bone.rotation.x,
            y: bone.rotation.y,
            z: bone.rotation.z
          }));

          // Store target rotations
          if (!result.pose) return;

          const targetStates = result.pose.boneStates.map(state => ({
            name: state.boneName,
            x: THREE.MathUtils.degToRad(state.rotationX),
            y: THREE.MathUtils.degToRad(state.rotationY),
            z: THREE.MathUtils.degToRad(state.rotationZ)
          })) ?? [];

          // Animation duration in milliseconds
          const duration = 500;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const eased = progress < 0.5 
              ? 4 * progress * progress * progress 
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            // Update each bone's rotation
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
              setSaveStatus(`Loaded pose`);
              resolve();
            }
          };

          requestAnimationFrame(animate);
        });
      }
    } catch (error) {
      setSaveStatus('Error loading pose');
    }
  };

  useEffect(() => {
    const fetchPoses = async () => {
      const result = await getAllPoses();
      if (result.success) {
        setPoses(result.poses);
      }
    };
    fetchPoses();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // Get container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Setup camera with a fixed position to show full model
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4); // Adjusted height and distance for better centering
    camera.lookAt(0, 1.5, 0); // Adjusted lookAt to match camera height

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Reduced ambient light intensity
    scene.add(ambientLight);
    
    // Main front light
    const frontLight = new THREE.DirectionalLight(0xffffff, 4); // Increased intensity
    frontLight.position.set(0, 2, 4); // Moved further forward (higher z value)
    scene.add(frontLight);

    // Add a softer fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(0, 0, 2);
    scene.add(fillLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      '/3d/human_character.glb',
      (gltf) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale model to fit view
        const scale = 2 / size.y; // Slightly increased scale
        gltf.scene.scale.setScalar(scale);
        
        // Position model at exact center
        gltf.scene.position.x = -center.x * scale;
        gltf.scene.position.y = -center.y * scale + 1.5; // Offset to match camera lookAt
        gltf.scene.position.z = -center.z * scale;

        modelRef.current = gltf.scene;
        scene.add(gltf.scene);

        // Store bones with improved initialization
        const bones: { [key: string]: THREE.Bone } = {};
        gltf.scene.traverse((object) => {
          if ((object as THREE.Bone).isBone) {
            const bone = object as THREE.Bone;
            bones[bone.name] = bone;
            // Initialize bone rotation order
            bone.rotation.order = 'XYZ';
            bone.updateMatrix();
          }
        });
        bonesRef.current = bones;
      },
      undefined,
      (error) => console.error('Error:', error)
    );

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Simple render loop without controls
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

  // Modify the playPoseSequence function to update the text
  const playPoseSequence = async (poseNames: string[]) => {
    console.log('playPoseSequence started', poseNames);
    setIsPlaying(true);
    isPlayingRef.current = true;
    setDisplayText('Hello Welcome Namaste');

    try {
      const poseDataPromises = poseNames.map(name => getPose(name));
      const poseResults = await Promise.all(poseDataPromises);
      const validPoses = poseResults.filter(result => result.success && result.pose);

      console.log('All poses loaded, starting animation');

      for (let i = 0; i < validPoses.length; i++) {
        if (!isPlayingRef.current) break;
        
        setCurrentPoseIndex(i);
        const result = validPoses[i];
        if (result.pose) {
          await loadPose(result.pose.name);
          await new Promise(resolve => setTimeout(resolve, 1)); // Almost no delay
        }
      }
    } catch (error) {
      console.error('Error in pose sequence:', error);
    }
    
    setIsPlaying(false);
    setCurrentPoseIndex(0);
    setDisplayText('');
  };

  // Modify the stopPoseSequence function
  const stopPoseSequence = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    setDisplayText('');
  };

  return (
    <div className="flex h-full">
      {/* Left: Controls Panel */}
      <div className="w-96 bg-white shadow-xl border-r border-gray-200 flex flex-col h-screen">

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Group Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Body Part Group
            </label>
            <select 
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                setSelectedSubgroup('');
                setSelectedBone('');
                setRotation({ x: 0, y: 0, z: 0 });
              }}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose group...</option>
              {getAvailableGroups().map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* Subgroup Selection */}
          {selectedGroup && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Specific Part
              </label>
              <select 
                value={selectedSubgroup}
                onChange={(e) => {
                  setSelectedSubgroup(e.target.value);
                  setSelectedBone('');
                  setRotation({ x: 0, y: 0, z: 0 });
                }}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose specific part...</option>
                {getAvailableSubgroups(selectedGroup).map((subgroup) => (
                  <option key={subgroup} value={subgroup}>{subgroup}</option>
                ))}
              </select>
            </div>
          )}

          {/* Modified Bone Selection */}
          {selectedGroup && selectedSubgroup && (
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Select Bone
              </label>
              <select
                value={selectedBone}
                onChange={(e) => {
                  const newBone = e.target.value;
                  setSelectedBone(newBone);
                  // Rotation will be updated by the useEffect
                }}
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose bone...</option>
                {getBonesForSelection().map((bone) => (
                  <option key={bone} value={bone}>{bone}</option>
                ))}
              </select>
            </div>
          )}

          {/* Rotation Controls */}
          {selectedBone && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedBone}
                </h3>
                <button
                  onClick={handleResetRotation}
                  className="px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg"
                >
                  Reset
                </button>
              </div>

              {/* Axis Controls */}
              {['x', 'y', 'z'].map((axis) => {
                const limits = getCurrentLimits();
                const min = limits ? limits[axis as keyof typeof limits].min : -180;
                const max = limits ? limits[axis as keyof typeof limits].max : 180;

                return (
                  <div key={axis} className="p-4 bg-gray-50 rounded-xl space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">
                        {axis.toUpperCase()} Axis Rotation
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={rotation[axis as keyof typeof rotation]}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            if (!isNaN(value)) {
                              handleBoneRotation(
                                axis as 'x' | 'y' | 'z',
                                Math.min(Math.max(value, min), max).toString()
                              );
                            }
                          }}
                          className="w-20 text-sm font-mono bg-white px-2 py-1 rounded-md border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-sm font-mono">°</span>
                      </div>
                    </div>
                    
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step="0.1"
                      value={rotation[axis as keyof typeof rotation]}
                      onChange={(e) => handleBoneRotation(axis as 'x' | 'y' | 'z', e.target.value)}
                      className="w-full h-2 bg-blue-200 rounded-lg accent-blue-600"
                    />
                    
                    <div className="flex gap-2">
                      {[
                        min,
                        min / 2,
                        0,
                        max / 2,
                        max
                      ].map((degree, index) => (
                        <button
                          key={`${axis}-${index}-${degree}`}
                          onClick={() => handleBoneRotation(
                            axis as 'x' | 'y' | 'z', 
                            degree.toString()
                          )}
                          className="flex-1 py-2 text-xs bg-white hover:bg-gray-50 text-gray-700 
                            rounded-lg border hover:border-gray-300"
                        >
                          {Math.round(degree)}°
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add this after the rotation controls section */}
        <div className="p-8 border-t border-gray-200 mt-auto">
          {saveStatus && (
            <div className="mb-4 text-sm text-center text-gray-600">
              {saveStatus}
            </div>
          )}
          
          {/* {selectedBone && (
            <button
              onClick={handleSaveCurrentBone}
              className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Save Current Bone Position
            </button>
          )} */}

          <div className="space-y-2">
            <input
              type="text"
              value={poseName}
              onChange={(e) => setPositionName(e.target.value)}
              placeholder="Enter pose name"
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={handleSaveCurrentPose}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Save Full Pose
            </button>
          </div>
        </div>
      </div>

      {/* Middle & Right: Model Viewer and Pose List */}
      <div className="flex-1 bg-white flex">
        {/* Middle: 3D Model */}
        <div ref={containerRef} className="w-3/4 h-full" />
        
        {/* Right: Pose List */}
        <div className="w-1/4 border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                console.log('Button clicked');
                console.log('Current poses:', poses);
                console.log('Is playing:', isPlaying);
                
                if (!isPlaying) {
                  // Define your specific sequence
                  const desiredSequence = ['le', "t's", "lo", "ok", "A", "R", "ju", "st", "60", "sec", "onds", "music", "A", "R", "mean", "overlay", "ing", "digi", "tal", "images", "re", "al", "world", "en", "han", "ce", "digi", "tal", "deta", "ils"];
                  
                  // Filter poses to match your sequence order
                  const matchingPoses = desiredSequence.filter(name => 
                    poses.some(pose => pose.name === name)
                  );
                  
                  console.log('Playing sequence:', matchingPoses);
                  playPoseSequence(matchingPoses);
                } else {
                  stopPoseSequence();
                }
              }}
              className={`w-full px-4 py-2 ${
                isPlaying 
                  ? 'bg-pink-600 hover:bg-pink-700' 
                  : 'bg-pink-500 hover:bg-pink-600'
              } text-white rounded-lg`}
            >
              {isPlaying ? 'Stop Sequence' : 'Play Sequence'}
            </button>
            {isPlaying && (
              <div className="mt-2 text-sm text-center text-gray-600">
                Playing pose
              </div>
            )}
            {displayText && (
              <div className="mt-4 text-xl font-bold text-center text-gray-800">
                {displayText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanModel; 
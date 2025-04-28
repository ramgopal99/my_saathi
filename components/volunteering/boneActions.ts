'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function savePose(poseName: string, boneStates: { name: string, x: number, y: number, z: number }[]) {
  try {
    const pose = await prisma.pose.upsert({
      where: { name: poseName },
      create: {
        name: poseName,
        boneStates: {
          create: boneStates.map(bone => ({
            boneName: bone.name,
            rotationX: bone.x,
            rotationY: bone.y,
            rotationZ: bone.z,
          }))
        }
      },
      update: {
        boneStates: {
          deleteMany: {},
          create: boneStates.map(bone => ({
            boneName: bone.name,
            rotationX: bone.x,
            rotationY: bone.y,
            rotationZ: bone.z,
          }))
        }
      }
    });
    return { success: true, pose };
  } catch (error) {
    console.error('Failed to save pose:', error);
    return { success: false };
  }
}

export async function getAllPoses() {
  try {
    const poses = await prisma.pose.findMany();
    return { success: true, poses };
  } catch (error) {
    console.error('Failed to get poses:', error);
    return { success: false, poses: [] };
  }
}

export async function getPose(poseName: string) {
  try {
    const pose = await prisma.pose.findUnique({
      where: { name: poseName },
      include: { boneStates: true }
    });
    return { success: true, pose };
  } catch (error) {
    console.error('Failed to get poses:', error);
    return { success: false, pose: null };
  }
}

export async function saveBoneRotation(
  boneName: string,
  rotationX: number,
  rotationY: number,
  rotationZ: number,
  posterName: string = "default"
) {
  try {
    const bone = await prisma.bone.upsert({
      where: { name: boneName },
      update: {
        currentX: rotationX,
        currentY: rotationY,
        currentZ: rotationZ,
        posterName
      },
      create: {
        name: boneName,
        currentX: rotationX,
        currentY: rotationY,
        currentZ: rotationZ,
        posterName
      }
    });
    return { success: true, bone };
  } catch (error) {
    console.error('Failed to save bone rotation:', error);
    return { success: false };
  }
} 
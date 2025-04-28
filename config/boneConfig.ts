interface BoneConfig {
  bones: string[];
  limits: {
    x: { min: number; max: number };
    y: { min: number; max: number };
    z: { min: number; max: number };
  };
}

export const boneGroups: Record<string, Record<string, BoneConfig>> = {
  'Right Hand': {
    'Hand': {
      bones: ['RightHand_49'],
      limits: { x: {min: -180, max: 180}, y: {min: -180, max: 180}, z: {min: -180, max: 180} }
    },
    'Thumb': {
      bones: ['RightHandThumb1_32', 'RightHandThumb2_31', 'RightHandThumb3_30', 'RightHandThumb4_29'],
      limits: { x: {min: -45, max: 45}, y: {min: -45, max: 45}, z: {min: -45, max: 45} }
    },
    'Index': {
      bones: ['RightHandIndex1_36', 'RightHandIndex2_35', 'RightHandIndex3_34', 'RightHandIndex4_33'],
      limits: { x: {min: -180, max: 180}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Middle': {
      bones: ['RightHandMiddle1_40', 'RightHandMiddle2_39', 'RightHandMiddle3_38', 'RightHandMiddle4_37'],
      limits: { x: {min: -180, max: 180}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Ring': {
      bones: ['RightHandRing1_44', 'RightHandRing2_43', 'RightHandRing3_42', 'RightHandRing4_41'],
      limits: { x: {min: -180, max: 180}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Pinky': {
      bones: ['RightHandPinky1_48', 'RightHandPinky2_47', 'RightHandPinky3_46', 'RightHandPinky4_45'],
      limits: { x: {min: -180, max: 180}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    }
  },
  'Left Hand': {
    'Hand': {
      bones: ['LeftHand_25'],
      limits: { x: {min: -90, max: 90}, y: {min: -90, max: 90}, z: {min: -90, max: 90} }
    },
    'Thumb': {
      bones: ['LeftHandThumb1_8', 'LeftHandThumb2_7', 'LeftHandThumb3_6', 'LeftHandThumb4_5'],
      limits: { x: {min: -45, max: 45}, y: {min: -45, max: 45}, z: {min: -45, max: 45} }
    },
    'Index': {
      bones: ['LeftHandIndex1_12', 'LeftHandIndex2_11', 'LeftHandIndex3_10', 'LeftHandIndex4_9'],
      limits: { x: {min: -90, max: 90}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Middle': {
      bones: ['LeftHandMiddle1_16', 'LeftHandMiddle2_15', 'LeftHandMiddle3_14', 'LeftHandMiddle4_13'],
      limits: { x: {min: -90, max: 90}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Ring': {
      bones: ['LeftHandRing1_20', 'LeftHandRing2_19', 'LeftHandRing3_18', 'LeftHandRing4_17'],
      limits: { x: {min: -90, max: 90}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Pinky': {
      bones: ['LeftHandPinky1_24', 'LeftHandPinky2_23', 'LeftHandPinky3_22', 'LeftHandPinky4_21'],
      limits: { x: {min: -90, max: 90}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    }
  },
  'Arms': {
    'Right Shoulder': {
      bones: ['RightShoulder_52'],
      limits: { x: {min: -180, max: 180}, y: {min: -45, max: 180}, z: {min: -90, max: 90} }
    },
    'Right Upper Arm': {
      bones: ['RightArm_51'],
      limits: { x: {min: -180, max: 180}, y: {min: -45, max: 180}, z: {min: -90, max: 90} }
    },
    'Right Forearm': {
      bones: ['RightForeArm_50'],
      limits: { x: {min: -180, max: 180}, y: {min: -180, max: 180}, z: {min: -180, max: 180} }
    },
    'Left Shoulder': {
      bones: ['LeftShoulder_28'],
      limits: { x: {min: -180, max: 180}, y: {min: -180, max: 180}, z: {min: -180, max: 180} }
    },
    'Left Upper Arm': {
      bones: ['LeftArm_27'],
      limits: { x: {min: -180, max: 180}, y: {min: -180, max: 180}, z: {min: -180, max: 180} }
    },
    'Left Forearm': {
      bones: ['LeftForeArm_26'],
      limits: { x: {min: -180, max: 180}, y: {min: -180, max: 180}, z: {min: -180, max: 180} }
    }
  },
  'Legs': {
    'Right Upper Leg': {
      bones: ['RightUpLeg_65'],
      limits: { x: {min: -90, max: 90}, y: {min: -45, max: 45}, z: {min: -45, max: 45} }
    },
    'Right Lower Leg': {
      bones: ['RightLeg_64'],
      limits: { x: {min: 0, max: 150}, y: {min: -10, max: 10}, z: {min: -10, max: 10} }
    },
    'Right Foot': {
      bones: ['RightFoot_63', 'RightToeBase_62', 'RightToe_End_61'],
      limits: { x: {min: -45, max: 45}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    },
    'Left Upper Leg': {
      bones: ['LeftUpLeg_60'],
      limits: { x: {min: -90, max: 90}, y: {min: -45, max: 45}, z: {min: -45, max: 45} }
    },
    'Left Lower Leg': {
      bones: ['LeftLeg_59'],
      limits: { x: {min: 0, max: 150}, y: {min: -10, max: 10}, z: {min: -10, max: 10} }
    },
    'Left Foot': {
      bones: ['LeftFoot_58', 'LeftToeBase_57', 'LeftToe_End_56'],
      limits: { x: {min: -45, max: 45}, y: {min: -30, max: 30}, z: {min: -30, max: 30} }
    }
  },
  'Torso': {
    'Root': {
      bones: ['GLTF_created_0_rootJoint'],
      limits: { x: {min: -45, max: 45}, y: {min: -180, max: 180}, z: {min: -45, max: 45} }
    },
    'Spine': {
      bones: ['Hips_66', 'Spine_55', 'Spine1_54', 'Spine2_53'],
      limits: { x: {min: -45, max: 45}, y: {min: -45, max: 45}, z: {min: -45, max: 45} }
    }
  },
  'Head': {
    'Neck': {
      bones: ['Neck_4'],
      limits: { x: {min: -45, max: 45}, y: {min: -90, max: 90}, z: {min: -45, max: 45} }
    },
    'Head': {
      bones: ['Head_3', 'HeadTop_End_0'],
      limits: { x: {min: -45, max: 45}, y: {min: -90, max: 90}, z: {min: -45, max: 45} }
    },
    'Eyes': {
      bones: ['LeftEye_1', 'RightEye_2'],
      limits: { x: {min: -30, max: 30}, y: {min: -30, max: 30}, z: {min: 0, max: 0} }
    }
  }
}; 
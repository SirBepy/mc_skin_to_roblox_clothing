const config = {
  templates: {
    width: 585,
    height: 559,
  },
  minecraft: {
    width: 64,
    height: 64,
  },
  garments: {
    shirt: {
      regions: {
        up: {
          label: 'UP',
          drawRegion: { x: 231, y: 8, w: 128, h: 64 },
          skinMap: { x: 20, y: 16, w: 8, h: 4 },
        },
        right: {
          label: 'R',
          drawRegion: { x: 165, y: 74, w: 64, h: 128 },
          skinMap: { x: 16, y: 20, w: 4, h: 12 },
        },
        front: {
          label: 'FRONT',
          drawRegion: { x: 231, y: 74, w: 128, h: 128 },
          skinMap: { x: 20, y: 20, w: 8, h: 12 },
        },
        left: {
          label: 'L',
          drawRegion: { x: 361, y: 74, w: 64, h: 128 },
          skinMap: { x: 28, y: 20, w: 4, h: 12 },
        },
        back: {
          label: 'BACK',
          drawRegion: { x: 427, y: 74, w: 128, h: 128 },
          skinMap: { x: 32, y: 20, w: 8, h: 12 },
        },
        down: {
          label: 'DOWN',
          drawRegion: { x: 231, y: 204, w: 128, h: 64 },
          skinMap: { x: 28, y: 16, w: 8, h: 4 },
          flipAxis: 'y',
        },

        right_arm_l: {
          label: 'RL',
          drawRegion: { x: 151, y: 355, w: 64, h: 128 },
          skinMap: { x: 40, y: 20, w: 4, h: 12 },
        },
        right_arm_b: {
          label: 'RB',
          drawRegion: { x: 217, y: 355, w: 64, h: 128 },
          skinMap: { x: 44, y: 20, w: 4, h: 12 },
        },
        right_arm_r: {
          label: 'RR',
          drawRegion: { x: 19, y: 355, w: 64, h: 128 },
          skinMap: { x: 48, y: 20, w: 4, h: 12 },
        },
        right_arm_f: {
          label: 'RF',
          drawRegion: { x: 85, y: 355, w: 64, h: 128 },
          skinMap: { x: 52, y: 20, w: 4, h: 12 },
        },
        right_arm_u: {
          label: 'RU',
          drawRegion: { x: 217, y: 289, w: 64, h: 64 },
          skinMap: { x: 44, y: 16, w: 4, h: 4 },
        },
        right_arm_d: {
          label: 'RD',
          drawRegion: { x: 217, y: 485, w: 64, h: 64 },
          skinMap: { x: 48, y: 16, w: 4, h: 4 },
        },

        left_arm_l: {
          label: 'LL',
          drawRegion: { x: 506, y: 355, w: 64, h: 128 },
          skinMap: { x: 32, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_arm_l',
        },
        left_arm_b: {
          label: 'LB',
          drawRegion: { x: 308, y: 355, w: 64, h: 128 },
          skinMap: { x: 36, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_arm_b',
        },
        left_arm_r: {
          label: 'LR',
          drawRegion: { x: 374, y: 355, w: 64, h: 128 },
          skinMap: { x: 40, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_arm_r',
        },
        left_arm_f: {
          label: 'LF',
          drawRegion: { x: 440, y: 355, w: 64, h: 128 },
          skinMap: { x: 44, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_arm_f',
        },
        left_arm_u: {
          label: 'LU',
          drawRegion: { x: 308, y: 289, w: 64, h: 64 },
          skinMap: { x: 36, y: 48, w: 4, h: 4 },
          mirrorFromIfOld: 'right_arm_u',
        },
        left_arm_d: {
          label: 'LD',
          drawRegion: { x: 308, y: 485, w: 64, h: 64 },
          skinMap: { x: 40, y: 48, w: 4, h: 4 },
          mirrorFromIfOld: 'right_arm_d',
        },
      },
    },
    pants: {
      regions: {
        right_leg_l: {
          label: 'RL',
          drawRegion: { x: 151, y: 355, w: 64, h: 128 },
          skinMap: { x: 0, y: 20, w: 4, h: 12 },
        },
        right_leg_b: {
          label: 'RB',
          drawRegion: { x: 217, y: 355, w: 64, h: 128 },
          skinMap: { x: 4, y: 20, w: 4, h: 12 },
        },
        right_leg_r: {
          label: 'RR',
          drawRegion: { x: 19, y: 355, w: 64, h: 128 },
          skinMap: { x: 8, y: 20, w: 4, h: 12 },
        },
        right_leg_f: {
          label: 'RF',
          drawRegion: { x: 85, y: 355, w: 64, h: 128 },
          skinMap: { x: 12, y: 20, w: 4, h: 12 },
        },
        right_leg_u: {
          label: 'RU',
          drawRegion: { x: 217, y: 289, w: 64, h: 64 },
          skinMap: { x: 4, y: 16, w: 4, h: 4 },
        },
        right_leg_d: {
          label: 'RD',
          drawRegion: { x: 217, y: 485, w: 64, h: 64 },
          skinMap: { x: 8, y: 16, w: 4, h: 4 },
        },

        left_leg_l: {
          label: 'LL',
          drawRegion: { x: 506, y: 355, w: 64, h: 128 },
          skinMap: { x: 16, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_leg_l',
        },
        left_leg_b: {
          label: 'LB',
          drawRegion: { x: 308, y: 355, w: 64, h: 128 },
          skinMap: { x: 20, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_leg_b',
        },
        left_leg_r: {
          label: 'LR',
          drawRegion: { x: 374, y: 355, w: 64, h: 128 },
          skinMap: { x: 24, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_leg_r',
        },
        left_leg_f: {
          label: 'LF',
          drawRegion: { x: 440, y: 355, w: 64, h: 128 },
          skinMap: { x: 28, y: 52, w: 4, h: 12 },
          mirrorFromIfOld: 'right_leg_f',
        },
        left_leg_u: {
          label: 'LU',
          drawRegion: { x: 308, y: 289, w: 64, h: 64 },
          skinMap: { x: 20, y: 48, w: 4, h: 4 },
          mirrorFromIfOld: 'right_leg_u',
        },
        left_leg_d: {
          label: 'LD',
          drawRegion: { x: 308, y: 485, w: 64, h: 64 },
          skinMap: { x: 24, y: 48, w: 4, h: 4 },
          mirrorFromIfOld: 'right_leg_d',
        },
      },
    },
  },
};

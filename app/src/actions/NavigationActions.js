import {
    LEFT_CLICK,
    RIGHT_CLICK,
    UPDATE_VIEW_ACHIEVEMENTS,
    UPDATE_VIEW_HIGHSCORE,
    UPDATE_VIEW_PROFILE
} from './types';

export const onLeftClicked = (show, view) => {
        return {
        type: LEFT_CLICK,
        payload: {
            show,
            view
        }
    };
};

export const onRightClicked = (show, view) => {
        return {
        type: RIGHT_CLICK,
        payload: {
            show,
            view
        }
    };
};

export const forceViewUpdateAchievements = (update) => {
        return {
        type: UPDATE_VIEW_ACHIEVEMENTS,
        payload: update
    };
};

export const forceViewUpdateHighscore = (update) => {
        return {
        type: UPDATE_VIEW_HIGHSCORE,
        payload: update
    };
};

export const forceViewUpdateProfile = (update) => {
        return {
        type: UPDATE_VIEW_PROFILE,
        payload: update
    };
};

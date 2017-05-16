import {
    LEFT_CLICK,
    RIGHT_CLICK
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

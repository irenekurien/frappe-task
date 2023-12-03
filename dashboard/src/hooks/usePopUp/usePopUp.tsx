import { useState } from 'react';

type PopUpState = {
    isOpen: boolean;
    data?: unknown;
};

type UsePopUpReturn = {
    popUp: Record<string, PopUpState>;
    handlePopUpOpen: (type: string, data?: unknown) => void;
    handlePopUpClose: (type: string) => void;
};

export const usePopUp = (popUpNames: string[]): UsePopUpReturn => {
    const [popUp, setPopUp] = useState<Record<string, PopUpState>>(
        Object.fromEntries(popUpNames.map((popUpName) => [popUpName, { isOpen: false }]))
    );

    const handlePopUpOpen = (type: string, data?: unknown): void => {
        setPopUp({ ...popUp, [type]: { isOpen: true, data } });
    };

    const handlePopUpClose = (type: string): void => {
        setPopUp({ ...popUp, [type]: { isOpen: false } });
    };

    return {
        popUp,
        handlePopUpOpen,
        handlePopUpClose,
    };
};

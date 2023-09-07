import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const buttonClick = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const AnimatedButton = styled(Button)<{ isAddedToCart: boolean }>(({ theme, isAddedToCart }) => ({
    mt: theme.spacing(1),
    mb: theme.spacing(2),
    minWidth: 120,
    height: 30,
    backgroundColor: isAddedToCart ? "#949494" : "#000000",
    color: "#ffffff",
    transition: "background-color 0.3s, color 0.3s",
    "&:hover": {
        background: isAddedToCart ? "#767676" : "#949494",
    },
    animation: isAddedToCart
        ? `${buttonClick} 2s`
        : "none",
    position: "relative",
    "& .bubbles": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
    },
    "& .bubble": {
        backgroundColor: "#00FF80",
        borderRadius: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "block",
        zIndex: -1,
        animation: "move-bubble 1.5s infinite",
    },
}));

interface AnimatedButtonProps extends ButtonProps {
    isAddedToCart: boolean;
}

const AnimatedButtonComponent: React.FC<AnimatedButtonProps> = ({ isAddedToCart, children, ...rest }) => {
    return (
        <AnimatedButton isAddedToCart={isAddedToCart} {...rest}>
            {children}
        </AnimatedButton>
    );
};

export default AnimatedButtonComponent;

import "./GlobalStyles.scss";
import "./OverrideStyleAntd.scss";

type GlobalStylesProps = {
    children: JSX.Element;
};

function GlobalStyles({ children }: GlobalStylesProps) {
    return children;
}

export default GlobalStyles;

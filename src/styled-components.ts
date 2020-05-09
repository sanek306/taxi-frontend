import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface ThemeInterface {
    blueColor: string;
    greyColor: string;
}

const {
    default: styled,
    css,
    keyframes,
    createGlobalStyle,
    ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, keyframes, createGlobalStyle, ThemeProvider };
export default styled;
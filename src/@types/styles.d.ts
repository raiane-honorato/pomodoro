// extensão d.ts definição de tipos do typescript
import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

//criando tipagem para o módulo styled-components
// sobrescreve DefaultTheme e extende com ThemeType definindo uma interface vazia. Assim, styled-components tem ThemType como tipagem
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends ThemeType {}
}

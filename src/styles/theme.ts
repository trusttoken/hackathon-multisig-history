import { COLORS } from "./colors";

export type CustomTheme = typeof theme;

export const theme = {
  colors: {
    // Primary/Neutrals
    White: `${COLORS.White}`,
    Black: `${COLORS.Black}`,
    GrayNurse: `${COLORS.GrayNurse}`,
    Mouse: `${COLORS.Mouse}`,
    Iron: `${COLORS.Iron}`,
    Edward: `${COLORS.Edward}`,
    Corduroy: `${COLORS.Corduroy}`,
    CapeCod: `${COLORS.CapeCod}`,
    HeavyMetal: `${COLORS.HeavyMetal}`,
    Transparent: COLORS.Transparent,

    // Secondary
    AquaSpring: `${COLORS.AquaSpring}`,
    JaggedIce: `${COLORS.JaggedIce}`,
    MonteCarlo: `${COLORS.MonteCarlo}`,
    OxidizedGreen: `${COLORS.OxidizedGreen}`,
    Elm: `${COLORS.Elm}`,

    // Tertiary
    ForgetMeNot: `${COLORS.ForgetMeNot}`,
    MandysPink: `${COLORS.MandysPink}`,
    TonysPink: `${COLORS.TonysPink}`,
    CopperOrange: `${COLORS.CopperOrange}`,
    Crail: `${COLORS.Crail}`,

    // Notifications
    PersianRed: `${COLORS.PersianRed}`,
    Fulvous: `${COLORS.Fulvous}`,
    Emerald: `${COLORS.Emerald}`,
    MistyRose: `${COLORS.MistyRose}`,
    Antique: `${COLORS.Antique}`,
    Honeydew: `${COLORS.Honeydew}`,
    Cornflower: `${COLORS.Cornflower}`,
    Slate: `${COLORS.Slate}`,
    Purpureus: `${COLORS.Purpureus}`,

    // Text
    Text0: `${COLORS.Text0}`,
    Text01: `${COLORS.Text01}`,
    Text02: `${COLORS.Text02}`,
    Text03: `${COLORS.Text03}`,
  },
};

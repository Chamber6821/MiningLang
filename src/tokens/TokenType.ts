// noinspection JSUnusedGlobalSymbols
enum TokenType {
    Unknown = "Unknown", Space = "Space", Tie = "Tie",

    Procedure = "Procedure",
    Function = "Function",
    Constant = "Constant",
    While = "While",
    Direction = "Direction",

    LBrace = "LBrace", RBrace = "RBrace",
    LPar = "LPar", RPar = "RPar",

    Assign = "Assign",
    Plus = "Plus", Minus = "Minus",
    Multiple = "Multiple", Divide = "Divide",
    Mod = "Mod",

    Number = "Number", Name = "Name"
}

export default TokenType

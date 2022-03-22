// Supported languages.
type LanguageId = "en"; // | "es" | ...

type Date = {
    $date: string;
};

type Alias = {
    language: string;
    value: string;
};

type Labels = {
    [key in LanguageId]: Alias;
};

type Aliases = {
    en?: Alias[];
};

type Descriptions = {
    en?: Alias;
};

type PropId = "digikey_part_num" | "mouser_part_num" | "ref_url" | "retrieved";

type Type = "statement";
type Rank = "normal";
type SnaksOrder = PropId[];
type SnakType = "value";
type DataType = "external_id" | "time" | "url";
type Value = string | Date;

type DataValue = {
    value: Value;
    type: DataType;
};

type Snak = {
    snaktype: SnakType;
    property: PropId;
    hash: string;
    datavalue: DataValue;
    datatype: DataType;
};

type Mainsnak = Snak;

type Snaks = {
    [key in PropId]: Snak[];
};

type Reference = {
    snaks: Snaks;
    snaks_order: SnaksOrder;
    hash: string;
};

type References = Reference[];

type Claim = {
    mainsnak: Mainsnak;
    type: Type;
    id: string;
    rank: Rank;
    references: References;
};

type Claims = {
    [key in PropId]: Claim[];
};

type OID = {
    $date: string;
};

type Entity = {
    _id: OID;
    modified: Date;
    labels: Labels;
    aliases: Aliases;
    descriptions: Descriptions;
    claims: Claims;
};

export type {
    LanguageId,
    Date,
    Alias,
    Labels,
    Aliases,
    Descriptions,
    PropId,
    Type,
    Rank,
    SnaksOrder,
    SnakType,
    DataType,
    Value,
    DataValue,
    Snak,
    Mainsnak,
    Snaks,
    Reference,
    References,
    Claim,
    Claims,
    Entity,
    OID,
};

const countryCodes = {
    Nigeria: "ng",
    Ghana: "gh",
    Portugal: "pt",
    "Great Britain": "gb",
    Finland: "fi",
    Germany: "de",
    "Bolivia (Plurinational State of)": "bo",
    "United States of America": "us",
    "United States": "us",
    "United Kingdom": "gb",
    Egypt: "eg",
    Spain: "es",
    China: "cn",
    Sudan: "sd",
    Brazil: "br",
    Mexico: "mx",
    Pakistan: "pk",
    Australia: "au",
    France: "fr",
    India: "in",
    Kuwait: "kw",
    "South Africa": "za",
    Japan: "jp",
    "Saudi Arabia": "sa",
    Vietnam: "vn",
    "South Korea": "kr",
    Colombia: "co",
    Canada: "ca",
    Argentina: "ar",
    Taiwan: "tw",
};

export function getCountryFlag(nationality) {
    const countryCode = countryCodes[nationality];

    if (!countryCode) return null;

    return `https://flagcdn.com/${countryCode}.svg`;
}
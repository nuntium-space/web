export class Config
{
    public static readonly FEED_PAGE_SIZE = 30;

    public static readonly DEFAULT_PAGE_TITLE = "nuntium";
    public static readonly PAGE_TITLE_SUFFIX = ` | ${Config.DEFAULT_PAGE_TITLE}`;

    public static readonly LANGUAGES = [
        {
            id: "en",
            display_name: "English",
        },
        {
            id: "it",
            display_name: "Italiano",
        },
    ];

    public static readonly CURRENCIES = [ "usd", "eur" ];
}

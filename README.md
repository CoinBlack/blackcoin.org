## Contributing

Please run before sending PR:

```
npm run format
npm run lint
npm run check
```

Note that directories are written with the root of the project as `/`. You will need to consider that to mean `/path/to/project/` (copy paste won't work).

### Organization

Most contributors will be concerned with [/src/lib/pages](/src/lib/pages) and may need to serve files from [/static](/static).

Elements not tied to a page can be found at [/src/lib/components](/src/lib/components).

Internationalization (.i18n.ts) files for layout are stored along side other data and template files. Some .ts have i18n data as well.

#### Update Exchange Listings

In [/src/lib/pages/home/exchange-list.ts](/src/lib/pages/home/exchange-list.ts)

```
	{
		name: 'FreiExchange',
		url: 'https://freiexchange.com/market/BLK/BTC',
		image: '/images/exchanges/freiexchange.png'
	},
```

You can see from the data pattern what info is required. You can easily find that info at the exchange website.

For example:
![Add Exchange Img](/raw/main/static/images/README/add-exchange.png)

Most likely you will download a **.png logo**. You will need to put it in [/static/images/exchanges](/static/images/exchanges). WebP versions are generated automatically at build time.

---

#### Update News Content

In [/src/lib/pages/home/news.ts](/src/lib/pages/home/news.ts)

```
    ...
	{
		url: 'https://blackcoinmore.org',
		date: 'December 18, 2024',
		news: {
			en: 'Blackcoin More v26.2.0 release became available.'
		}
	},
    ...
```

And, update layout i18n data at [/src/lib/pages/home/news.i18n.ts](/src/lib/pages/home/news.i18n.ts)

```
export default {
	latest_news: {
		zh: '最新消息' /*Chinese*/,
		es: 'Últimas noticias' /*Spanish*/,
        ...
```

#### I18N Data

An **English** (`en: 'translation',`) translation **must be available**, all others are optional.

We currently support 22 languages.

Here they are, listed in order with most widely spoken first.

```
    ...
	key: {
		zh: 'translation' /*Chinese*/,
		es: 'translation' /*Spanish*/,
		en: 'translation' /*English*/,
		hi: 'translation' /*Hindi*/,
		ar: 'translation' /*Arabic - Right-to-left*/,
		pt: 'translation' /*Portuguese*/,
		bn: 'translation' /*Bengal*/,
		ru: 'translation' /*Russian*/,
		ja: 'translation' /*Japanese*/,
		jv: 'translation' /*Javanese*/,
		de: 'translation' /*German*/,
		ko: 'translation' /*Korean*/,
		fr: 'translation' /*French*/,
		te: 'translation' /*Telugu*/,
		mr: 'translation' /*Marathi*/,
		tr: 'translation' /*Turkish*/,
		ta: 'translation' /*Tamil*/,
		vi: 'translation' /*Vietnamese*/,
		ur: 'translation' /*Urdu - Right-to-left*/,
		nl: 'translation' /*Dutch*/,
		it: 'translation' /*Italian*/,
		hr: 'translation' /*Croatian*/
	},
	...
```

I18N data can be passed to the [/src/lib/i18n.ts](/src/lib/i18n.ts) function in three configurations.
`src[key][lang]`, `src[lang][key]`, and `src[lang]`.
This allows for translation data to be passed conveniently and structured according to what makes sense for any given component.

## Developing

```bash
# dev server
npm run dev
# or
npm run dev -- --open
```

## Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Commiting

Before you PR run `format`, `lint`, and `check`.

```
# format
npm run format

# lint
npm run lint

# check
npm run check
```

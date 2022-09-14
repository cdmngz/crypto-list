import { prepareImgSrcToUrl } from "../utils";

interface Props {
  currencies: Array<{
    id: string;
    name: string;
    code: string;
    type: string;
  }>;
}

function Currencies({ currencies }: Props) {
  return (
    <section className="py-10 container text-center mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {currencies
        ? currencies.map((currency) => (
            <div
              key={currency.id}
              className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="py-8 flex flex-col items-center">
                <img
                  className="mb-3 w-24 h-24 rounded-full shadow-lg truncate"
                  src={prepareImgSrcToUrl(currency.name, currency.code)}
                  loading="lazy"
                  alt={currency.code}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/404.png";
                  }}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {currency.name}
                </h5>
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  {currency.code}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-400">
                  {currency.type}
                </span>
              </div>
            </div>
          ))
        : null}
    </section>
  );
}

export default Currencies;

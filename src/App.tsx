import { useEffect, useState } from "react";
import Currencies from "./components/Currencies";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { getAllCurrencies } from "./services/currencies";
import { Currency } from "./types";
import { sortBy } from "./utils";
import { orderBy } from "./utils/constants";

function App() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [filteredList, setFilteredList] = useState<Currency[]>([]);
  const [isSupportedInUS, setIsSupportedInUS] = useState<boolean>(false);
  const [supportsTestMode, setSupportsTestMode] = useState<boolean>(false);
  const [sortByName, setSortByName] = useState<number>(0);
  const [sortByCode, setSortByCode] = useState<number>(0);

  useEffect(() => {
    getAllCurrencies()
      .then((response) => {
        setCurrencies(response);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    let tempList = [...currencies];
    tempList = sortBy(tempList, "name", sortByName);
    tempList = sortBy(tempList, "code", sortByCode);
    tempList = isSupportedInUS
      ? tempList.filter(
          (element: { isSupportedInUS: any }) => element.isSupportedInUS
        )
      : tempList;
    tempList = supportsTestMode
      ? tempList.filter(
          (element: { supportsTestMode: any }) => element.supportsTestMode
        )
      : tempList;
    setFilteredList((currentFilteredList) => (currentFilteredList = tempList));
  }, [isSupportedInUS, supportsTestMode, currencies, sortByName, sortByCode]);

  const handleIsSupportedInUS = () => {
    setIsSupportedInUS(!isSupportedInUS);
  };

  const handleSupportsTestMode = () => {
    setSupportsTestMode(!supportsTestMode);
  };

  const handleSortByName = () => {
    setSortByCode(orderBy.NONE);
    setSortByName((n) =>
      n < Object.keys(orderBy).length - 1 ? n + 1 : orderBy.NONE
    );
  };

  const handleSortByCode = () => {
    setSortByName(orderBy.NONE);
    setSortByCode((n) =>
      n < Object.keys(orderBy).length - 1 ? n + 1 : orderBy.NONE
    );
  };

  const handleSortShuffle = () => {
    setFilteredList((currentFilteredList) =>
      [...currentFilteredList].sort(() => 0.5 - Math.random())
    );
  };

  return (
    <div>
      <header className="flex items-center justify-between flex-wrap p-6">
        <div className="flex items-center flex-no-shrink text-white">
          <a className="lg:mx-4" href="/">
            <img
              className="h-10"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"
              alt="Logo"
            />
          </a>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto select-none">
          <div className="text-sm lg:flex-grow">
            <span
              onClick={handleIsSupportedInUS}
              className={`${
                isSupportedInUS ? "font-medium" : null
              } mr-4 inline-block text-teal-lighter cursor-pointer hover:underline`}
            >
              Supported in the US
            </span>
            <span
              onClick={handleSupportsTestMode}
              className={`${
                supportsTestMode ? "font-medium" : null
              } mr-4 inline-block text-teal-lighter cursor-pointer hover:underline`}
            >
              Available in Test Mode
            </span>
            <span
              onClick={handleSortByName}
              className={`${
                sortByName ? "font-medium" : null
              } mr-4 inline-block text-teal-lighter cursor-pointer hover:underline`}
            >
              Sort by Name{" "}
              {sortByName === orderBy.ASC ? (
                <span>&#8593;</span>
              ) : sortByName === orderBy.DESC ? (
                <span>&#8595;</span>
              ) : null}
            </span>
            <span
              onClick={handleSortByCode}
              className={`${
                sortByCode ? "font-medium" : null
              } mr-4 inline-block text-teal-lighter cursor-pointer hover:underline`}
            >
              Sort by Code{" "}
              {sortByCode === orderBy.ASC ? (
                <span>&#8593;</span>
              ) : sortByCode === orderBy.DESC ? (
                <span>&#8595;</span>
              ) : null}
            </span>
          </div>
          <button
            onClick={handleSortShuffle}
            className="mr-4 py-1 px-2 bg-transparent border border-violet-700 text-violet-700 rounded-full leading-none hover:border-transparent hover:text-white hover:bg-violet-700"
          >
            Shuffle
          </button>
        </div>
      </header>
      {filteredList.length ? (
        <Currencies currencies={filteredList} />
      ) : (
        <Loading />
      )}
      <Footer></Footer>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import Card from "./components/Card";
import { axiosInstance } from "./helper";
interface Props {}
interface State {
  cocktails: Cocktail[];
  inputValue: string | any;
  searchCocktail: Cocktail[];
  loading: boolean;
}

export interface Cocktail {
  dateModified: string;
  idDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strInstructions: string;
  strInstructionsDE: string;
  strInstructionsES: string;
  strInstructionsFR: null | string;
  strInstructionsIT: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
}
export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cocktails: [],
      inputValue: "",
      searchCocktail: [],
      loading: false,
    };
  }
  handleSearch = async (inputVl: string) => {
    this.setState({
      loading: true,
    });
    const res = await axiosInstance.get(`/search.php?s=${inputVl}`);
    if (res.status === 200) {
      this.setState({
        searchCocktail: res.data.drinks,
        loading: false,
      });
    }

    this.setState({
      loading: false,
    });
  };
  handleFetch = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await axiosInstance.get("/search.php?f=a");

      if (res.status === 200) {
        this.setState({
          cocktails: res.data.drinks,
          searchCocktail: [],
        });
      }
    } catch (error) {
      this.setState({
        loading: false,
        searchCocktail: [],
      });
    }

    this.setState({
      loading: false,
      searchCocktail: [],
    });
  };

  componentDidMount() {
    this.handleFetch();
  }
  render() {
    return (
      <div className="container mx-auto">
        <div className="flex w-full justify-center gap-6 mt-10">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Search for name or word..."
              type="text"
              name="search"
              value={this.state.inputValue}
              onChange={(e) => {
                this.setState({
                  inputValue: e.target.value,
                });

                this.handleSearch(e.target.value);
              }}
            />
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700
           text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              this.handleSearch(this.state.inputValue);
              this.setState({
                inputValue: "",
              });
            }}
          >
            click me to search
          </button>
        </div>
        {this.state.loading ? (
          <>
            <div className="flex items-center mt-10 justify-center w-full space-x-2">
              <div
                className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full
                text-purple-800 border-purple-600  animate-pulse
                "
                role="status"
              >
                <span className=" hidden">.</span>
              </div>
            </div>
          </>
        ) : (
          <div className="container mx-auto">
            {this.state.searchCocktail &&
            this.state.searchCocktail.length > 0 ? (
              <section className="mt-10">
                <div className="flex flex-wrap justify-evenly  gap-x-4">
                  {this.state.searchCocktail.map((cocktail) => {
                    const { idDrink } = cocktail;
                    return <Card key={idDrink} {...cocktail} />;
                  })}
                </div>
              </section>
            ) : (
              <section className="mt-10">
                <div className="flex flex-wrap justify-evenly ">
                  {this.state.cocktails.map((cocktail) => {
                    const { idDrink } = cocktail;
                    return <Card key={idDrink} {...cocktail} />;
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Cocktail } from "../App";

export default class Card extends Component<Cocktail, {}> {
  render() {
    const {
      idDrink,
      strDrinkThumb,
      dateModified,
      strCategory,
      strGlass,
      strIngredient1,
      strDrink,
      strInstructions,
      strInstructionsDE,
      strInstructionsIT,
      strInstructionsES,
      strInstructionsFR,
    } = this.props;
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg space-y-2 mb-10">
        <img className="w-full" src={strDrinkThumb} alt={idDrink} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{strDrink}</div>
          <p className="text-gray-700 text-base">{strGlass}</p>
          <p className="text-gray-700 text-base">{strIngredient1}</p>
          <p className="text-gray-700 text-base">
            {strInstructions}
            {strInstructionsDE}
            {strInstructionsIT},{strInstructionsES},{strInstructionsFR}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{strCategory}
          </span>
          {/* <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span> */}
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {dateModified}
          </span>
        </div>
      </div>
    );
  }
}

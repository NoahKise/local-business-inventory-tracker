import React from "react";
import StockList from "./StockList";
import { v4 } from 'uuid';
import NewStockItemForm from "./NewStockItemForm";
import StockItemDetail from "./StockItemDetail";

class InventoryControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newItemFormVOP: false,
      itemDetailVOP: false,
      selectedId: null,
      mainInventoryList: [
        {
          name: 'The Lost Caverns of Ixilan',
          price: '$6',
          releaseDate: 'November 17th, 2023',
          description: "In The Lost Caverns of Ixalan, your players will face an adventure like never before, discovering long-lost ruins, ancient civilizations alive and well, and fan-favorite creatures running rampant. Dig into the heart of Ixalan with a piece of prehistory for every play style. Set Boosters are the best packs to open just for fun, containing gorgeous art cards and the opportunity to explore the set. Contents: 12 Magic: The Gathering cards per booster, 1-4 cards of rarity Rare or higher in every pack, 1 Art Card (foil-stamped Signature Art Card replaces the Art Card in 10% of Boosters), 3-7 Uncommon cards, 3-7 Common cards, 1 Land card (Traditional Foil in 20% of packs, Full-Art Land in 30% of Boosters), 1 Traditional Foil card, 1 token/ad card, Helper card, or a special card from Magic's history—found in 25% of packs.",
          leftInStock: 30,
          imgSrc: "img/ixilan.webp",
          id: v4()
        },
        {
          name: 'Wilds of Eldraine',
          price: '$5',
          releaseDate: 'September 8th, 2023',
          description: "Eldraine is a plane of wonderful chaos and contradictions—your players will be invited to start their own storybook adventure, enveloped in a fantastical fairytale with a twist to break the curse of an endless slumber. Set Boosters are the best packs to open just for fun, containing gorgeous art cards and the opportunity to explore the set. Contents: 12 Magic: The Gathering cards per booster, 1-5 cards of rarity Rare or higher in every pack, 1 Art Card (foil-stamped Signature Art Card replaces the Art Card in 10% of Boosters), 3-7 Uncommon cards, 3-6 Common cards, 1 Land card (Traditional Foil in 20% of packs, Full-Art Land in 33% of Boosters), At least 1 special Borderless card of rarity Uncommon or higher, 1 Traditional Foil card, 1 token/ad card, Helper card, or card from 'The List' (a special card from Magic's history or Universes Within card—found in 25% of packs).",
          leftInStock: 30,
          imgSrc: "img/wilds-of-eldraine.webp",
          id: v4()
        },
        {
          name: 'Commander Masters',
          price: '$16',
          releaseDate: 'August 4th, 2023',
          description: "Roll out the red carpet for your Commander! Enhance your multiplayer decks with some of the greatest cards to ever grace the Commander format. We’ve also got some surprises in store, with some packs containing special treatment cards destined for starring roles in your collection. Each Commander Masters Set Booster contains 15 Magic cards, 1 Art Card, and 1 token/ad card or card from 'The List' (a special card from Magic's history—found in 25% of packs), including 2–6 cards of rarity Rare or higher (2: 34%; 3: 48%; 4: 15%; 5: 2%; 6: <1%) and 3–8 Uncommon, 4–8 Common, and 1 Land cards. Every pack contains at least 1 Traditional Foil card of any rarity. A Traditional Foil Land replaces the basic land in 20% of Set Boosters and a Foil-Stamped Signature Art Card replaces the Art Card in 10% of Set Boosters. A Traditional Foil Borderless Mythic Rare card can be found in 1% of boosters.",
          leftInStock: 24,
          imgSrc: "img/commander-masters.webp",
          id: v4()
        }
      ],
      cartItems: []
    };
  }

  handleNewItemClick = () => {
    this.setState(prevState => ({ newItemFormVOP: !prevState.newItemFormVOP }));
  }

  handleAddingNewStockItemToInventory = (newInventory) => {
    const newMainInventoryList = this.state.mainInventoryList.concat(newInventory);
    this.setState({
      mainInventoryList: newMainInventoryList,
      newItemFormVOP: false
    });
  };

  handleEditingItem = (updatedInventory) => {
    const updatedList = this.state.mainInventoryList.map(item => {
      if (item.id === this.state.selectedId) {
        return {
          ...item,
          name: updatedInventory.name,
          price: updatedInventory.price,
          leftInStock: updatedInventory.leftInStock,
          releaseDate: updatedInventory.releaseDate,
          description: updatedInventory.description,
          imgSrc: updatedInventory.imgSrc
        };
      }
      return item;
    });

    this.setState({
      mainInventoryList: updatedList,
      itemDetailVOP: false
    });
  };

  handleUpdateClick = (id) => {
    this.setState(prevState => ({
      itemDetailVOP: !prevState.itemDetailVOP,
      selectedId: id
    }));
  };

  handleSellClick = (id) => {
    const updatedList = this.state.mainInventoryList.map(item => {
      if (item.id === id && item.leftInStock > 0) {
        return {
          ...item,
          leftInStock: item.leftInStock - 1
        };
      }
      return item;
    });

    this.setState({
      mainInventoryList: updatedList
    });
  };

  handleReturnToInventoryClick = () => {
    if (this.state.newItemFormVOP) {
      this.setState(prevState => ({ newItemFormVOP: !prevState.newItemFormVOP }));
    } else this.setState(prevState => ({ itemDetailVOP: !prevState.itemDetailVOP }));
  }

  handleDeleteItem = (itemId) => {
    const updatedInventoryList = this.state.mainInventoryList.filter(item => item.id !== itemId);
    this.setState({
      mainInventoryList: updatedInventoryList,
      itemDetailVOP: false,
    });
  };


  render() {
    let currentlyVisibleState = null;

    if (this.state.newItemFormVOP) {
      currentlyVisibleState = (
        <>
          <NewStockItemForm onNewInventoryCreation={this.handleAddingNewStockItemToInventory} />
          <div className="bottom-button">
            <button onClick={this.handleReturnToInventoryClick}>Return to Inventory</button>
          </div>
        </>)
    } else if (this.state.itemDetailVOP) {
      const selectedItem = this.state.mainInventoryList.find(
        (item) => item.id === this.state.selectedId
      );
      currentlyVisibleState = (
        <>
          <StockItemDetail
            onItemEdit={this.handleEditingItem}
            onDelete={this.handleDeleteItem}
            selectedItemId={this.state.selectedId}
            selectedDetails={selectedItem}
          />
          <div className="bottom-button">
            <button onClick={this.handleReturnToInventoryClick}>Return to Inventory</button>
          </div>
        </>)
    } else currentlyVisibleState = (
      <>
        <StockList
          addToCart={this.addToCart}
          handleUpdate={this.handleUpdateClick}
          itemsInStock={this.state.mainInventoryList}
          handleSell={this.handleSellClick}
        />
        <div className="bottom-button">
          <button onClick={this.handleNewItemClick}>New Stock Item</button>
        </div>
      </>)
    return (
      <React.Fragment>
        {currentlyVisibleState}

      </React.Fragment >
    );
  }

}

export default InventoryControl;
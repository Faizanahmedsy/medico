"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SelectedCard {
  index: number;
  selected: boolean;
}

export default function OfferProductsModule() {
  // State to store selected cards
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>(
    Array.from({ length: 10 }).map((_, index) => ({ index, selected: false }))
  );

  // Function to toggle selection of a card
  const toggleCardSelection = (index: number) => {
    const updatedCards = selectedCards.map((card) =>
      card.index === index ? { ...card, selected: !card.selected } : card
    );
    setSelectedCards(updatedCards);
  };

  return (
    <div className="">
      <div className="grid grid-cols-3 gap-4">
        {selectedCards.map((card) => (
          <Card key={card.index} className={card.selected ? "bg-blue-200" : ""}>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <div>Products</div>
                  <input
                    type="checkbox"
                    checked={card.selected}
                    onChange={() => toggleCardSelection(card.index)}
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <span>Hello world</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

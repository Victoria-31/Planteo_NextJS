import type { Meta, StoryObj } from "@storybook/react";
import PlantCard from "./PlantCard";

const meta: Meta<typeof PlantCard> = {
  title: "Components/PlantCard",
  component: PlantCard,
};

export default meta;

type Story = StoryObj<typeof PlantCard>;

export const Default: Story = {
  args: {
    plant: {
      id: "plant123",
      name: "Tomate",
      background:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=300&q=80",
      description: "Une plante facile à cultiver, idéale pour le potager.",
    },
  },
};

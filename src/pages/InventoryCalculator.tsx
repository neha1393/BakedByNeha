import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Package,
  Calculator,
  Database,
  Download,
  Upload,
} from "lucide-react";
import Navbar from "../components/Navbar";

/* =========================
   TYPES
========================= */

type Unit = "kg" | "g" | "l" | "ml" | "count";

interface InventoryItem {
  id: string;
  name: string;

  price: number;
  priceQty: number;
  priceUnit: Unit;

  stockQty: number;
  stockUnit: Unit;
}

interface UsageItem {
  itemId: string;
  usedQty: number;
  usedUnit: Unit;
}

/* =========================
   HELPERS
========================= */

const units: Unit[] = ["kg", "g", "l", "ml", "count"];

function convertToBase(qty: number, unit: Unit) {
  switch (unit) {
    case "kg":
      return qty * 1000;

    case "g":
      return qty;

    case "l":
      return qty * 1000;

    case "ml":
      return qty;

    default:
      return qty;
  }
}

function convertFromBase(qty: number, unit: Unit) {
  switch (unit) {
    case "kg":
      return qty / 1000;

    case "l":
      return qty / 1000;

    default:
      return qty;
  }
}

function exportCSV(data: InventoryItem[]) {
  const headers = [
    "name",
    "price",
    "priceQty",
    "priceUnit",
    "stockQty",
    "stockUnit",
  ];

  const rows = data.map((item) => [
    item.name,
    item.price,
    item.priceQty,
    item.priceUnit,
    item.stockQty,
    item.stockUnit,
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
}

function parseCSV(csv: string): InventoryItem[] {
  const lines = csv.trim().split("\n");

  const [, ...data] = lines;

  return data.map((line, index) => {
    const [name, price, priceQty, priceUnit, stockQty, stockUnit] =
      line.split(",");

    return {
      id: String(index + 1),
      name,
      price: Number(price),
      priceQty: Number(priceQty),
      priceUnit: priceUnit as Unit,
      stockQty: Number(stockQty),
      stockUnit: stockUnit as Unit,
    };
  });
}

/* =========================
   REUSABLE COMPONENTS
========================= */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700 sm:text-sm">
        {label}
      </label>

      <input
        {...props}
        className="h-11 rounded-xl border border-pink-200 bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-pink-300 sm:h-12 sm:px-4"
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

function UnitSelect({ label, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-700 sm:text-sm">
        {label}
      </label>

      <select
        {...props}
        className="h-11 rounded-xl border border-pink-200 bg-white px-3 text-sm outline-none transition focus:ring-2 focus:ring-pink-300 sm:h-12 sm:px-4"
      >
        {units.map((unit) => (
          <option key={unit}>{unit}</option>
        ))}
      </select>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 rounded-3xl bg-white p-4 shadow-lg sm:mb-8 sm:p-6 md:p-8">
      <div className="mb-4 flex items-center gap-2 sm:mb-6 sm:gap-3">
        {icon}

        <h2 className="text-lg font-black text-gray-800 sm:text-2xl">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

function GradientButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex h-11 items-center justify-center rounded-xl px-4 text-sm font-bold text-white shadow-lg transition active:scale-95 sm:h-12 sm:px-6 sm:text-base ${className}`}
    >
      {children}
    </button>
  );
}

/* =========================
   INITIAL DATA
========================= */

const initialInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Flour",
    price: 60,
    priceQty: 500,
    priceUnit: "g",
    stockQty: 5,
    stockUnit: "kg",
  },

  {
    id: "2",
    name: "Sugar",
    price: 45,
    priceQty: 1,
    priceUnit: "kg",
    stockQty: 3,
    stockUnit: "kg",
  },

  {
    id: "3",
    name: "Milk",
    price: 35,
    priceQty: 500,
    priceUnit: "ml",
    stockQty: 5,
    stockUnit: "l",
  },

  {
    id: "4",
    name: "Eggs",
    price: 7,
    priceQty: 1,
    priceUnit: "count",
    stockQty: 24,
    stockUnit: "count",
  },
];

const emptyItem = {
  name: "",
  price: 0,
  priceQty: 1,
  priceUnit: "kg" as Unit,
  stockQty: 0,
  stockUnit: "kg" as Unit,
};

/* =========================
   MAIN COMPONENT
========================= */

function InventoryCalculator() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  const [usageItems, setUsageItems] = useState<UsageItem[]>([
    {
      itemId: "1",
      usedQty: 200,
      usedUnit: "g",
    },
  ]);

  const [exportText, setExportText] = useState("");

  const [newItem, setNewItem] = useState(emptyItem);

  /* =========================
     INVENTORY
  ========================= */

  const addInventoryItem = () => {
    if (!newItem.name.trim()) return;

    const item: InventoryItem = {
      id: String(inventory.length + 1),
      ...newItem,
    };

    setInventory((prev) => [...prev, item]);

    setNewItem(emptyItem);
  };

  /* =========================
     USAGE
  ========================= */

  const addUsageRow = () => {
    setUsageItems((prev) => [
      ...prev,
      {
        itemId: inventory[0]?.id || "",
        usedQty: 0,
        usedUnit: "g",
      },
    ]);
  };

  const removeUsageRow = (index: number) => {
    setUsageItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUsage = <K extends keyof UsageItem>(
    index: number,
    field: K,
    value: UsageItem[K],
  ) => {
    const updated = [...usageItems];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setUsageItems(updated);
  };

  /* =========================
     TOTAL COST
  ========================= */

  const totalCost = useMemo(() => {
    let total = 0;

    usageItems.forEach((usage) => {
      const item = inventory.find((i) => i.id === usage.itemId);

      if (!item) return;

      const usedBaseQty = convertToBase(usage.usedQty, usage.usedUnit);

      const priceBaseQty = convertToBase(item.priceQty, item.priceUnit);

      const costPerBaseUnit = item.price / priceBaseQty;

      total += usedBaseQty * costPerBaseUnit;
    });

    return total.toFixed(2);
  }, [usageItems, inventory]);

  /* =========================
     UPDATED INVENTORY
  ========================= */

  const updatedInventory = useMemo(() => {
    return inventory.map((item) => {
      const stockBase = convertToBase(item.stockQty, item.stockUnit);

      let totalUsed = 0;

      usageItems.forEach((usage) => {
        if (usage.itemId === item.id) {
          totalUsed += convertToBase(usage.usedQty, usage.usedUnit);
        }
      });

      let remaining = stockBase - totalUsed;

      if (remaining < 0) remaining = 0;

      return {
        ...item,
        stockQty: Number(convertFromBase(remaining, item.stockUnit).toFixed(2)),
      };
    });
  }, [inventory, usageItems]);

  /* =========================
     EXPORT
  ========================= */

  const generateCSV = () => {
    const csv = exportCSV(updatedInventory);

    setExportText(csv);
  };

  const generateJSON = () => {
    setExportText(JSON.stringify(updatedInventory, null, 2));
  };

  /* =========================
     IMPORT
  ========================= */

  const loadData = () => {
    try {
      if (exportText.trim().startsWith("[")) {
        const parsed = JSON.parse(exportText) as InventoryItem[];

        setInventory(
          parsed.map((item, index) => ({
            ...item,
            id: String(index + 1),
          })),
        );

        alert("JSON Loaded");

        return;
      }

      const parsed = parseCSV(exportText);

      setInventory(
        parsed.map((item, index) => ({
          ...item,
          id: String(index + 1),
        })),
      );

      alert("CSV Loaded");
    } catch {
      alert("Invalid Data");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-rose-50 via-pink-50 to-orange-50 px-3 py-4 sm:px-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}

          <div className="mb-5 text-center sm:mb-8">
            <h1 className="bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-5xl md:text-6xl">
              Bakery Inventory Calculator
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Track ingredients, calculate recipe cost & manage stock easily
            </p>
          </div>

          {/* ADD INVENTORY */}

          <SectionCard
            title="Add Inventory Item"
            icon={<Package className="text-pink-500" size={22} />}
          >
            {/* ACTION BUTTONS */}

            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <GradientButton
                onClick={generateCSV}
                className="bg-linear-to-r from-blue-500 to-cyan-500"
              >
                <div className="flex items-center gap-2">
                  <Download size={16} />
                  Export CSV
                </div>
              </GradientButton>

              <GradientButton
                onClick={generateJSON}
                className="bg-linear-to-r from-purple-500 to-indigo-500"
              >
                Export JSON
              </GradientButton>

              <GradientButton
                onClick={loadData}
                className="bg-linear-to-r from-green-500 to-emerald-500"
              >
                <div className="flex items-center gap-2">
                  <Upload size={16} />
                  Import Data
                </div>
              </GradientButton>
            </div>

            {/* TEXTAREA */}

            <textarea
              value={exportText}
              onChange={(e) => setExportText(e.target.value)}
              placeholder="Paste CSV or JSON data..."
              className="mb-5 min-h-55 w-full rounded-2xl border border-pink-200 bg-gray-900 p-4 font-mono text-xs text-green-400 outline-none sm:text-sm"
            />

            {/* FORM */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
              <Input
                label="Item Name"
                placeholder="Flour"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
              />

              <Input
                label="Price ₹"
                type="number"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price: Number(e.target.value),
                  })
                }
              />

              <Input
                label="Price Qty"
                type="number"
                value={newItem.priceQty}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    priceQty: Number(e.target.value),
                  })
                }
              />

              <UnitSelect
                label="Price Unit"
                value={newItem.priceUnit}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    priceUnit: e.target.value as Unit,
                  })
                }
              />

              <Input
                label="Stock Qty"
                type="number"
                value={newItem.stockQty}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stockQty: Number(e.target.value),
                  })
                }
              />

              <UnitSelect
                label="Stock Unit"
                value={newItem.stockUnit}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    stockUnit: e.target.value as Unit,
                  })
                }
              />
            </div>

            <GradientButton
              onClick={addInventoryItem}
              className="mt-5 w-full bg-linear-to-r from-pink-500 to-rose-500 sm:w-fit"
            >
              <div className="flex items-center gap-2">
                <Plus size={18} />
                Add Inventory Item
              </div>
            </GradientButton>
          </SectionCard>

          {/* INVENTORY */}

          <SectionCard
            title="Inventory"
            icon={<Database className="text-pink-500" size={22} />}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-pink-100 bg-linear-to-br from-pink-50 to-rose-50 p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-black text-gray-800">
                      {item.name}
                    </h3>

                    <div className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
                      ₹{item.price}
                    </div>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>
                      Price Qty: {item.priceQty} {item.priceUnit}
                    </p>

                    <p>
                      Stock: {item.stockQty} {item.stockUnit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* USAGE */}

          <SectionCard
            title="Recipe Usage"
            icon={<Calculator className="text-pink-500" size={22} />}
          >
            <div className="mb-5">
              <GradientButton
                onClick={addUsageRow}
                className="w-full bg-linear-to-r from-pink-500 to-rose-500 sm:w-fit"
              >
                <div className="flex items-center gap-2">
                  <Plus size={18} />
                  Add Usage
                </div>
              </GradientButton>
            </div>

            <div className="space-y-4">
              {usageItems.map((usage, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-pink-100 bg-pink-50/60 p-4"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <select
                      value={usage.itemId}
                      onChange={(e) =>
                        updateUsage(index, "itemId", e.target.value)
                      }
                      className="h-11 rounded-xl border border-pink-200 bg-white px-3 text-sm outline-none"
                    >
                      {inventory.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={usage.usedQty}
                      onChange={(e) =>
                        updateUsage(index, "usedQty", Number(e.target.value))
                      }
                      className="h-11 rounded-xl border border-pink-200 bg-white px-3 text-sm outline-none"
                    />

                    <select
                      value={usage.usedUnit}
                      onChange={(e) =>
                        updateUsage(index, "usedUnit", e.target.value as Unit)
                      }
                      className="h-11 rounded-xl border border-pink-200 bg-white px-3 text-sm outline-none"
                    >
                      {units.map((unit) => (
                        <option key={unit}>{unit}</option>
                      ))}
                    </select>

                    <GradientButton
                      onClick={() => removeUsageRow(index)}
                      className="bg-red-500"
                    >
                      <div className="flex items-center gap-2">
                        <Trash2 size={16} />
                        Remove
                      </div>
                    </GradientButton>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}

            <div className="mt-6 rounded-3xl bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 p-5 text-white shadow-xl sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <Calculator />

                <h3 className="text-lg font-black sm:text-2xl">
                  Total Recipe Cost
                </h3>
              </div>

              <div className="mt-3 text-3xl font-black sm:mt-4 sm:text-5xl">
                ₹ {totalCost}
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}

export default InventoryCalculator;

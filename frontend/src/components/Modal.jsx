import { LuX } from "react-icons/lu";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "./Button";

function Modal({ closeModal, itemName, addItem }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name });
    setName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/50">
      <div className="relative rounded-lg bg-[#fff] px-16 py-8">
        <LuX
          className="absolute top-2 right-2 size-6 cursor-pointer"
          onClick={() => closeModal()}
        />
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-2xl font-bold text-[#000]">Agregar {itemName}</h2>
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              placeholder="Nombre"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button className="h-10 bg-[#171717] px-4 py-2 text-[#fafafa] hover:bg-[#171717]/90">
              Agregar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import { breakpoint } from "../pages";
import Input from "./input";
import Modal from "./modal";

const animals = [
  { name: "Dog", id: "002-dog" },
  { name: "Pandabear", id: "001-pandabear" },
  { name: "Elephant", id: "003-elephant" },
  { name: "Sheep", id: "004-sheep" },
  { name: "Fox", id: "005-fox" },
  { name: "Crocodile", id: "006-crocodile" },
  { name: "Llama", id: "007-llama" },
  { name: "Zebra", id: "008-zebra" },
  { name: "Horse", id: "009-horse" },
  { name: "Snake", id: "010-snake" },
  { name: "Bear", id: "011-bear" },
  { name: "Cat", id: "012-cat" },
  { name: "Rhinoceros", id: "013-rhinoceros" },
  { name: "Sloth", id: "014-sloth" },
  { name: "Whale", id: "015-whale" },
  { name: "Frog", id: "016-frog" },
  { name: "Hippopotamus", id: "017-hippopotamus" },
  { name: "Koala", id: "018-koala" },
  { name: "Boar", id: "019-boar" },
  { name: "Pig", id: "020-pig" },
  { name: "Guineapig", id: "021-guineapig" },
  { name: "Squirrel", id: "022-squirrel" },
  { name: "Lemur", id: "023-lemur" },
  { name: "Penguin", id: "047-penguin" }
];

export default ({ isOpen, onClose, onSubmit, initialValues }) => {
  const [name, setName] = React.useState("");
  const [animal, setAnimal] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName((initialValues && initialValues.name) || "");
      setAnimal((initialValues && initialValues.animal) || "");
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${initialValues ? "Edit" : "Add"} Player`}
        onSubmit={e => {
          e.preventDefault();
          if (!animal) alert("Please select an animal.");
          else onSubmit({ name, animal });
        }}
      >
        <div className="input-container">
          <Input required value={name} onChange={setName} placeholder="Name" />
        </div>
        <div className="animals">
          {animals.map(({ id, name }) => (
            <img
              key={id}
              className={`animal ${id === animal ? "selected" : ""}`}
              src={`/static/animals/${id}.png`}
              alt={name}
              title={name}
              onClick={() => setAnimal(id)}
            />
          ))}
        </div>
      </Modal>
      <style jsx>{`
        .input-container {
          width: 100%;
          padding: 0 20px;
          margin-bottom: 10px;
        }
        .animals {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0 20px;
        }
        .animal {
          margin: 2px;
          padding: 2px;
          height: 36px;
          width: 36px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          border-radius: var(--border-radius-small);
        }
        .animal.selected {
          margin: 0;
          height: 40px;
          width: 40px;
          border: 2px solid var(--button-color);
        }

        @media (min-width: ${breakpoint}) {
          .animal {
            margin: 6px;
            padding: 4px;
            height: 44px;
            width: 44px;
          }
          .animal.selected {
            height: 56px;
            width: 56px;
          }
        }
      `}</style>
    </>
  );
};

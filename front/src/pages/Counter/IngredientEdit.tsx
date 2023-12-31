import { useToast } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { NormalModal } from "../../components/Modal/NormalModal";
import {addIngredient} from "../../api/ingredient/ingredient.service";

export function IngredientEdit() {
    const toast = useToast();

    const [name, setName] = useState("");
    const [qtd, setQtd] = useState("");
    const [tags, setTags] = useState("");

    const [isModalVisible, setIsModalVisible] = useState(false);

    function createNewIngredient(event: FormEvent) {
        event.preventDefault();

        if (!name || !qtd || !tags) {
            return;
        }

        addIngredient(
            {
                name,
                qtd,
                tags,
            },
        )
            .then(() => {
                clearForm();
                toast({
                    description: "New ingredient created",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
            })
            .catch((error: any) => {
                console.log(error);
                toast({
                    description: "Error creating new ingredient",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            });
    }

    function clearForm() {
        setName("");
        setQtd("");
        setTags("");
    }

    return (
        <div className="h-full flex flex-col items-center ">
            <div className="flex justify-between w-[70%]">
                <form onSubmit={createNewIngredient} className="w-full">
                    <div className="grid grid-cols-2 grid-flow-row gap-14">
                        <div className="mt-3">
                            <label>Nome *</label>
                            <input
                                type="text"
                                placeholder="Título *"
                                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="mt-3">
                            <label>Quantidade *</label>
                            <input
                                type="text"
                                placeholder="Descrição"
                                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                                value={qtd}
                                onChange={(event) => setQtd(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 grid-flow-row gap-14">
                        <div className="mt-3">
                            <label>Tags *</label>
                            <input
                                type="text"
                                placeholder="Instruções"
                                className="w-full p-3 mt-1 rounded-lg placeholder:text-zinc-400 border-[1px] border-zinc-500"
                                value={tags}
                                onChange={(event) => setTags(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <div className="text-xs text-zinc-500">* Campo Obrigatório</div>
                        <div className="flex">
                            <button
                                onClick={() => setIsModalVisible(true)}
                                className="mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white bg-zinc-500"
                            >
                                Limpar
                            </button>
                            <button
                                type="submit"
                                className="ml-4 bg-red mt-4 rounded-lg p-2 flex items-center font-semibold justify-center hover:opacity-90 transition-all text-white"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {isModalVisible ? (
                <NormalModal
                    text="Are you sure you want to clear the fields?"
                    onCloseModal={() => {
                        setIsModalVisible(false);
                    }}
                    confirmClear={() => {
                        setIsModalVisible(false);
                        clearForm();
                    }}
                />
            ) : null}
        </div>
    );
}

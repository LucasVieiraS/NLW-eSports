import { useState, useEffect, FormEvent } from "react";

import { GameController, Check, CaretDown, CaretUp } from "phosphor-react";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Select from "@radix-ui/react-select";

import { Input } from "./Form/Input";
import { Option } from "../components/Form/Option"

import axios from "axios";

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
  const [gameId, setGameId] = useState<string>("")
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekdays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios("http://localhost:3333/games").then(response => setGames(response.data));
  }, []);

  async function handleCreateAd(event : FormEvent) {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!gameId) { alert("Escolha um jogo."); return }
    if (!data.name) { alert("Preencha o campo nome."); return }
    if (!data.yearsPlaying) { 
        alert("Há quantos anos joga? (Pode ser ZERO)") 
        return
      }
    if (!String(data.discord).match(/.*[^# ]#[0-9]{4}/g)) { 
      alert("Discord no formato: Usuário#0000")
      return
    }
    if (weekDays.length === 0) {
        alert("Escolha pelo menos 1 dia da semana.");
        return 
    }
    if (!String(data.hourStart).match(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g) || !String(data.hourEnd).match(/([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g)) {
        alert("Escolha um horário válido.")
        return
    }

    try {
        await axios.post(`http://localhost:3333/games/${gameId}/ads`, {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
        })
        alert('Anúncio criado com sucesso.');
    } catch (err) {
        console.log(err);
        alert('Erro ao criar anúncio.');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Select.Root onValueChange={value => setGameId(value)}>
              
              <Select.Trigger className="py-3 px-4 text-sm flex items-center justify-between rounded bg-zinc-900">
                <Select.SelectValue placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown className="w-6 h-6" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
              <Select.Content className="py-3 px-4 text-white bg-zinc-900 overflow-hidden rounded">

              <Select.SelectScrollUpButton className="bg-violet-500/50 rounded flex items-center justify-center">
                <CaretUp weight="bold" />
              </Select.SelectScrollUpButton>

                <Select.SelectViewport>
                  <Option disabled text="Selecione o game que deseja jogar" value="" />
                  {games.map(game =>
                    <Option key={game.id} value={game.id} text={game.title} />
                  )}
                </Select.SelectViewport>

              </Select.Content>
              </Select.Portal>

            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuário#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekdays}
              >
                <ToggleGroup.Item
                  title="Domingo"
                  value="0"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Segunda"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="1"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Terça"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="2"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quarta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="3"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quinta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="4"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sexta"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="5"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sábado"
                  className={`w-8 h-8 rounded  ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  value="6"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual seu horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

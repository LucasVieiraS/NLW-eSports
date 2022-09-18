import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassPlus } from 'phosphor-react'

export function CreateAdBanner() {
    return (
        <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600  text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} className="block" />
            Publicar anúncio
          </Dialog.Trigger>

        </div>
      </div>
    )
}
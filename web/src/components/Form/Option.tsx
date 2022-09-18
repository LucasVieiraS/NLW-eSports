import * as SelectPrimitive from "@radix-ui/react-select"
import { CaretLeft } from "phosphor-react"
import { OptionHTMLAttributes } from "react"

interface Props extends OptionHTMLAttributes<HTMLInputElement> {
  value: string
  text: string
}

export function Option(props: Props) {
    return (
        <SelectPrimitive.SelectItem
        {...props}
        value={props.value} 
        className="flex items-center gap-2 p-1 rounded justify-between hover:bg-violet-500/50 cursor-pointer" 
      >
        <SelectPrimitive.SelectItemText>{props.text}</SelectPrimitive.SelectItemText>
        <SelectPrimitive.SelectItemIndicator className="items-center justify-center">
          <CaretLeft weight="fill" />
        </SelectPrimitive.SelectItemIndicator>
      </SelectPrimitive.SelectItem>
    )
}
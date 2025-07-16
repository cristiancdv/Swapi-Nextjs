import CardIcon from "@/assets/icons/CardIcon";
import ListIcon from "@/assets/icons/ListIcon";
import {useSwitch,VisuallyHidden} from "@heroui/react";

export default function SwitchButton({ viewMode, toggleViewMode }: { viewMode: string, toggleViewMode: () => void }) {
    const {Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps} =
    useSwitch({
        value: viewMode === 'card' ? 'card' : 'list',
        onValueChange: toggleViewMode,
    });
    return (
        <div className="flex flex-col gap-2">
          <Component {...getBaseProps()}>
            <VisuallyHidden>
              <input {...getInputProps()} />
            </VisuallyHidden>
            <div
              {...getWrapperProps()}
              className={slots.wrapper({
                class: [
                  "w-8 h-8",
                  "flex items-center justify-center",
                  "rounded-lg bg-default-100 hover:bg-default-200",
                ],
              })}
            >
              {isSelected ? <ListIcon /> : <CardIcon />}
            </div>
          </Component>
          <p className="text-default-500 select-none">Lights: {isSelected ? "on" : "off"}</p>
        </div>
      );
    };


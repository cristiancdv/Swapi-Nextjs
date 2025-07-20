import CardIcon from "@/assets/icons/CardIcon";
import ListIcon from "@/assets/icons/ListIcon";
import {useSwitch,VisuallyHidden} from "@heroui/react";

export default function SwitchButton({ viewMode, toggleViewMode }: { viewMode: string, toggleViewMode: () => void }) {
    const {Component, slots, getBaseProps, getInputProps, getWrapperProps} =
    useSwitch({
        isSelected: viewMode === 'card',
        onValueChange: toggleViewMode,
    });
    return (
        <div className="flex flex-col bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg p-2 gap-2">
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
              {viewMode === 'table' ? <ListIcon /> : <CardIcon />}
            </div>
          </Component>
        </div>
      );
    };


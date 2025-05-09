import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { boardSizes } from "@workshop/interfaces/game";

import type { SettingsState } from "~/lib/store/settings";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { settingsSchema, useSettingsStore } from "~/lib/store/settings";

export function SettingsForm() {
  const gridSize = useSettingsStore((state) => state.gridSize);
  const level = useSettingsStore((state) => state.level);
  const { updateSettings } = useSettingsStore((state) => state.actions);

  const form = useForm<SettingsState>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      gridSize,
      level,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    updateSettings(values);
    form.reset(values);
  });

  const { isDirty } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Game settings form"
      >
        <FormField
          control={form.control}
          name="gridSize"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="gridSize">Grid Size</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Select
                    value={field.value.toString()}
                    onValueChange={field.onChange}
                    name="difficulty"
                  >
                    <SelectTrigger
                      id="difficulty-select"
                      className="w-full"
                      aria-labelledby="gridSize-label"
                    >
                      <SelectValue placeholder="Select a grid size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {boardSizes.map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FormMessage id="gridSize-error" role="alert">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="level-select">Difficulty</FormLabel>
              <FormControl>
                <div className="space-y-1">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name="level"
                  >
                    <SelectTrigger
                      id="level-select"
                      className="w-full"
                      aria-labelledby="level-label"
                    >
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FormMessage id="level-error" role="alert">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {isDirty && (
          <Button type="submit" aria-label="Save settings">
            Save
          </Button>
        )}
      </form>
    </Form>
  );
}

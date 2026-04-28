import { useState } from "react";
import { toast } from "sonner";
import * as AccordionUI from "@/components/ui/accordion";
import * as AlertUI from "@/components/ui/alert";
import * as BadgeUI from "@/components/ui/badge";
import * as ButtonUI from "@/components/ui/button";
import * as CalendarUI from "@/components/ui/calendar";
import * as CardUI from "@/components/ui/card";
import * as CheckboxUI from "@/components/ui/checkbox";
import * as CollapsibleUI from "@/components/ui/collapsible";
import * as DialogUI from "@/components/ui/dialog";
import * as DrawerUI from "@/components/ui/drawer";
import * as DropdownMenuUI from "@/components/ui/dropdown-menu";
import * as InputUI from "@/components/ui/input";
import * as LabelUI from "@/components/ui/label";
import * as PaginationUI from "@/components/ui/pagination";
import * as PopoverUI from "@/components/ui/popover";
import * as ProgressUI from "@/components/ui/progress";
import * as RadioGroupUI from "@/components/ui/radio-group";
import * as SelectUI from "@/components/ui/select";
import * as SeparatorUI from "@/components/ui/separator";
import * as SliderUI from "@/components/ui/slider";
import * as SonnerUI from "@/components/ui/sonner";
import * as SpinnerUI from "@/components/ui/spinner";
import * as SwitchUI from "@/components/ui/switch";
import * as TabsUI from "@/components/ui/tabs";
import * as TextareaUI from "@/components/ui/textarea";
import * as TooltipUI from "@/components/ui/tooltip";
import "./UIShowcasePage.css";

function UIShowcasePage() {
  const [progress, setProgress] = useState(45);
  const [sliderValue, setSliderValue] = useState([35]);
  const [switchOn, setSwitchOn] = useState(true);
  const [checkboxOn, setCheckboxOn] = useState(true);

  return (
    <section className="ui-showcase">
      <h2 className="ui-showcase__title">UI Showcase</h2>
      <p className="ui-showcase__subtitle">
        Live previews for the core UI primitives used in the app.
      </p>

      <div className="ui-showcase__section">
        <h3 className="ui-showcase__section-title">Core Interactive Demos</h3>
        <div className="ui-showcase__grid">
          <article className="ui-showcase__demo">
            <h3>Buttons, Badge, Spinner</h3>
            <div className="ui-showcase__row">
              <ButtonUI.Button>Primary</ButtonUI.Button>
              <ButtonUI.Button variant="outline">Outline</ButtonUI.Button>
              <BadgeUI.Badge>New</BadgeUI.Badge>
              <SpinnerUI.Spinner />
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Inputs</h3>
            <div className="ui-showcase__row">
              <InputUI.Input placeholder="Email" />
              <TextareaUI.Textarea placeholder="Tell us more" rows={2} />
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Selection</h3>
            <div className="ui-showcase__row">
              <CheckboxUI.Checkbox
                checked={checkboxOn}
                onCheckedChange={setCheckboxOn}
              />
              <SwitchUI.Switch
                checked={switchOn}
                onCheckedChange={setSwitchOn}
              />
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Progress + Slider</h3>
            <ProgressUI.Progress value={progress} />
            <SliderUI.Slider
              value={sliderValue}
              onValueChange={(next) => {
                setSliderValue(next);
                setProgress(next[0]);
              }}
              max={100}
              step={1}
            />
            <p className="ui-showcase__small">Value: {sliderValue[0]}%</p>
          </article>

          <article className="ui-showcase__demo">
            <h3>Select + Radio Group</h3>
            <div className="ui-showcase__row">
              <SelectUI.Select defaultValue="local">
                <SelectUI.SelectTrigger>
                  <SelectUI.SelectValue placeholder="Choose scope" />
                </SelectUI.SelectTrigger>
                <SelectUI.SelectContent>
                  <SelectUI.SelectItem value="local">Local</SelectUI.SelectItem>
                  <SelectUI.SelectItem value="regional">
                    Regional
                  </SelectUI.SelectItem>
                </SelectUI.SelectContent>
              </SelectUI.Select>
              <RadioGroupUI.RadioGroup
                defaultValue="monthly"
                className="ui-showcase__row"
              >
                <RadioGroupUI.RadioGroupItem value="weekly" id="weekly" />
                <LabelUI.Label htmlFor="weekly">Weekly</LabelUI.Label>
                <RadioGroupUI.RadioGroupItem value="monthly" id="monthly" />
                <LabelUI.Label htmlFor="monthly">Monthly</LabelUI.Label>
              </RadioGroupUI.RadioGroup>
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Tabs + Alert</h3>
            <TabsUI.Tabs defaultValue="overview">
              <TabsUI.TabsList>
                <TabsUI.TabsTrigger value="overview">
                  Overview
                </TabsUI.TabsTrigger>
                <TabsUI.TabsTrigger value="alerts">Alerts</TabsUI.TabsTrigger>
              </TabsUI.TabsList>
              <TabsUI.TabsContent value="overview">
                <p className="ui-showcase__small">
                  Community spend is on track.
                </p>
              </TabsUI.TabsContent>
              <TabsUI.TabsContent value="alerts">
                <AlertUI.Alert>
                  <AlertUI.AlertTitle>Heads up</AlertUI.AlertTitle>
                  <AlertUI.AlertDescription>
                    Local spend dipped 4% this week.
                  </AlertUI.AlertDescription>
                </AlertUI.Alert>
              </TabsUI.TabsContent>
            </TabsUI.Tabs>
          </article>

          <article className="ui-showcase__demo">
            <h3>Popover + Tooltip + Toast</h3>
            <div className="ui-showcase__row">
              <PopoverUI.Popover>
                <PopoverUI.PopoverTrigger asChild>
                  <ButtonUI.Button variant="outline">
                    Open Popover
                  </ButtonUI.Button>
                </PopoverUI.PopoverTrigger>
                <PopoverUI.PopoverContent>
                  Quick note content.
                </PopoverUI.PopoverContent>
              </PopoverUI.Popover>
              <TooltipUI.TooltipProvider>
                <TooltipUI.Tooltip>
                  <TooltipUI.TooltipTrigger asChild>
                    <ButtonUI.Button variant="secondary">
                      Hover me
                    </ButtonUI.Button>
                  </TooltipUI.TooltipTrigger>
                  <TooltipUI.TooltipContent>
                    Tooltip content
                  </TooltipUI.TooltipContent>
                </TooltipUI.Tooltip>
              </TooltipUI.TooltipProvider>
              <ButtonUI.Button
                onClick={() =>
                  toast("Saved", { description: "Demo notification" })
                }
              >
                Toast
              </ButtonUI.Button>
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Card + Table + Separator</h3>
            <CardUI.Card>
              <CardUI.CardHeader>
                <CardUI.CardTitle>Quarterly Snapshot</CardUI.CardTitle>
              </CardUI.CardHeader>
              <CardUI.CardContent>
                <SeparatorUI.Separator />
                <table className="ui-showcase__table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Local Transactions</td>
                      <td>128</td>
                    </tr>
                    <tr>
                      <td>Impact Score</td>
                      <td>+14%</td>
                    </tr>
                  </tbody>
                </table>
              </CardUI.CardContent>
            </CardUI.Card>
          </article>

          <article className="ui-showcase__demo">
            <h3>Accordion + Collapsible</h3>
            <AccordionUI.Accordion type="single" collapsible>
              <AccordionUI.AccordionItem value="item-1">
                <AccordionUI.AccordionTrigger>
                  How is impact calculated?
                </AccordionUI.AccordionTrigger>
                <AccordionUI.AccordionContent>
                  We apply local and non-local multipliers.
                </AccordionUI.AccordionContent>
              </AccordionUI.AccordionItem>
            </AccordionUI.Accordion>
            <CollapsibleUI.Collapsible>
              <CollapsibleUI.CollapsibleTrigger asChild>
                <ButtonUI.Button variant="ghost">More details</ButtonUI.Button>
              </CollapsibleUI.CollapsibleTrigger>
              <CollapsibleUI.CollapsibleContent>
                <p className="ui-showcase__small">
                  Component preview for expandable content.
                </p>
              </CollapsibleUI.CollapsibleContent>
            </CollapsibleUI.Collapsible>
          </article>

          <article className="ui-showcase__demo">
            <h3>Calendar + Pagination</h3>
            <CalendarUI.Calendar mode="single" selected={new Date()} />
            <div className="ui-showcase__row">
              <PaginationUI.Pagination>
                <PaginationUI.PaginationContent>
                  <PaginationUI.PaginationItem>
                    <PaginationUI.PaginationPrevious href="#" />
                  </PaginationUI.PaginationItem>
                  <PaginationUI.PaginationItem>
                    <PaginationUI.PaginationLink href="#" isActive>
                      1
                    </PaginationUI.PaginationLink>
                  </PaginationUI.PaginationItem>
                  <PaginationUI.PaginationItem>
                    <PaginationUI.PaginationNext href="#" />
                  </PaginationUI.PaginationItem>
                </PaginationUI.PaginationContent>
              </PaginationUI.Pagination>
            </div>
          </article>

          <article className="ui-showcase__demo">
            <h3>Dropdown + Dialog + Drawer</h3>
            <div className="ui-showcase__row">
              <DropdownMenuUI.DropdownMenu>
                <DropdownMenuUI.DropdownMenuTrigger asChild>
                  <ButtonUI.Button variant="outline">Menu</ButtonUI.Button>
                </DropdownMenuUI.DropdownMenuTrigger>
                <DropdownMenuUI.DropdownMenuContent>
                  <DropdownMenuUI.DropdownMenuItem>
                    Action one
                  </DropdownMenuUI.DropdownMenuItem>
                  <DropdownMenuUI.DropdownMenuItem>
                    Action two
                  </DropdownMenuUI.DropdownMenuItem>
                </DropdownMenuUI.DropdownMenuContent>
              </DropdownMenuUI.DropdownMenu>

              <DialogUI.Dialog>
                <DialogUI.DialogTrigger asChild>
                  <ButtonUI.Button variant="secondary">Dialog</ButtonUI.Button>
                </DialogUI.DialogTrigger>
                <DialogUI.DialogContent>
                  <DialogUI.DialogHeader>
                    <DialogUI.DialogTitle>Dialog Preview</DialogUI.DialogTitle>
                    <DialogUI.DialogDescription>
                      Quick dialog content for preview.
                    </DialogUI.DialogDescription>
                  </DialogUI.DialogHeader>
                </DialogUI.DialogContent>
              </DialogUI.Dialog>

              <DrawerUI.Drawer>
                <DrawerUI.DrawerTrigger asChild>
                  <ButtonUI.Button variant="ghost">Drawer</ButtonUI.Button>
                </DrawerUI.DrawerTrigger>
                <DrawerUI.DrawerContent>
                  <DrawerUI.DrawerHeader>
                    <DrawerUI.DrawerTitle>Drawer Preview</DrawerUI.DrawerTitle>
                  </DrawerUI.DrawerHeader>
                </DrawerUI.DrawerContent>
              </DrawerUI.Drawer>
            </div>
          </article>
        </div>
      </div>

      <SonnerUI.Toaster richColors position="top-right" />
    </section>
  );
}

export default UIShowcasePage;

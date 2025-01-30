import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface GenerateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (jsonInput: string) => Promise<void>;
  isLoading: boolean;
}

export default function GenerateForm({
  isOpen,
  onClose,
  onGenerate,
  isLoading,
}: GenerateFormProps) {
  const [jsonInput, setJsonInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jsonInput) {
      await onGenerate(jsonInput);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate GitHub README</DialogTitle>
          <DialogDescription>
            Provide custom JSON data to generate your profile README.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="json">Custom JSON Data</Label>
              <Textarea
                id="json"
                placeholder="Enter your custom JSON data"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="h-[200px]"
              />
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate README"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

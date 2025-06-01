import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface SaveNameButtonProps {
  name: string;
  description: string;
}

export function SaveNameButton({ name, description }: SaveNameButtonProps) {
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save names');
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('name_generations')
        .insert([
          {
            user_id: user.id,
            name,
            description,
            is_favorite: false
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Saved successfully:', data);
      toast.success('Name saved successfully!');
    } catch (error) {
      console.error('Error saving name:', error);
      if (error instanceof Error) {
        toast.error(`Failed to save name: ${error.message}`);
      } else {
        toast.error('Failed to save name. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={isSaving}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Heart className="w-4 h-4" />
      {isSaving ? 'Saving...' : 'Save Name'}
    </Button>
  );
} 
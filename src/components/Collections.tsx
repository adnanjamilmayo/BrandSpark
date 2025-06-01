import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Folder, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface Collection {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

interface CollectionsProps {
  onSelectCollection: (collectionId: string | null) => void;
  selectedCollectionId: string | null;
}

export function Collections({ onSelectCollection, selectedCollectionId }: CollectionsProps) {
  const { user } = useUser();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDescription, setNewCollectionDescription] = useState('');

  const fetchCollections = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (err) {
      console.error('Error fetching collections:', err);
      toast.error('Failed to fetch collections');
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [user]);

  const handleCreateCollection = async () => {
    if (!user || !newCollectionName.trim()) return;

    try {
      const { error } = await supabase
        .from('collections')
        .insert([
          {
            user_id: user.id,
            name: newCollectionName.trim(),
            description: newCollectionDescription.trim()
          }
        ]);

      if (error) throw error;

      toast.success('Collection created successfully');
      setNewCollectionName('');
      setNewCollectionDescription('');
      setIsCreating(false);
      fetchCollections();
    } catch (err) {
      console.error('Error creating collection:', err);
      toast.error('Failed to create collection');
    }
  };

  const handleShareCollection = async (collectionId: string) => {
    // Generate a shareable link
    const shareableLink = `${window.location.origin}/shared-collection/${collectionId}`;
    
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success('Shareable link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold">Collections</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCreating(!isCreating)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Collection
        </Button>
      </div>

      {isCreating && (
        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
          <Input
            placeholder="Collection Name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <Input
            placeholder="Description (optional)"
            value={newCollectionDescription}
            onChange={(e) => setNewCollectionDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleCreateCollection}>Create</Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Button
          variant={selectedCollectionId === null ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCollection(null)}
        >
          <Folder className="w-4 h-4 mr-2" />
          All Names
        </Button>
        
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
          >
            <Button
              variant={selectedCollectionId === collection.id ? "default" : "ghost"}
              className="flex-1 justify-start"
              onClick={() => onSelectCollection(collection.id)}
            >
              <Folder className="w-4 h-4 mr-2" />
              {collection.name}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleShareCollection(collection.id)}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 
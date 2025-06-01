import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Heart, Trash2, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { NameFilters } from './NameFilters';
import { Collections } from './Collections';

interface SavedName {
  id: string;
  name: string;
  description: string;
  created_at: string;
  is_favorite: boolean;
  collection_id?: string;
}

export function SavedNames() {
  const { user } = useUser();
  const [savedNames, setSavedNames] = useState<SavedName[]>([]);
  const [filteredNames, setFilteredNames] = useState<SavedName[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('newest');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);

  const fetchSavedNames = async () => {
    if (!user) return;

    try {
      let query = supabase
        .from('name_generations')
        .select('*')
        .eq('user_id', user.id);

      if (selectedCollectionId) {
        query = query.eq('collection_id', selectedCollectionId);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log('Fetched saved names:', data);
      setSavedNames(data || []);
      setFilteredNames(data || []);
    } catch (err) {
      console.error('Error fetching saved names:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch saved names');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedNames();
  }, [user, selectedCollectionId]);

  useEffect(() => {
    let filtered = [...savedNames];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        name =>
          name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          name.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (currentFilter === 'favorites') {
      filtered = filtered.filter(name => name.is_favorite);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredNames(filtered);
  }, [savedNames, searchQuery, currentFilter, currentSort]);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('name_generations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Name deleted successfully');
      fetchSavedNames();
    } catch (err) {
      console.error('Error deleting name:', err);
      toast.error('Failed to delete name');
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('name_generations')
        .update({ is_favorite: !currentFavorite })
        .eq('id', id);

      if (error) throw error;

      toast.success(currentFavorite ? 'Removed from favorites' : 'Added to favorites');
      fetchSavedNames();
    } catch (err) {
      console.error('Error updating favorite status:', err);
      toast.error('Failed to update favorite status');
    }
  };

  const handleShare = async (name: SavedName) => {
    const shareableLink = `${window.location.origin}/shared-name/${name.id}`;
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success('Shareable link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  if (loading) return <div>Loading saved names...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Collections Sidebar */}
        <div className="lg:col-span-1">
          <Collections
            onSelectCollection={setSelectedCollectionId}
            selectedCollectionId={selectedCollectionId}
          />
        </div>

        {/* Names List */}
        <div className="lg:col-span-3">
          <NameFilters
            onSearch={setSearchQuery}
            onFilterChange={setCurrentFilter}
            onSortChange={setCurrentSort}
          />

          <div className="space-y-4">
            {filteredNames.length === 0 ? (
              <p className="text-gray-500">No saved names found.</p>
            ) : (
              <div className="grid gap-4">
                {filteredNames.map((savedName) => (
                  <div
                    key={savedName.id}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{savedName.name}</h3>
                        <p className="text-gray-600 mt-1">{savedName.description}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(savedName.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleFavorite(savedName.id, savedName.is_favorite)}
                          className={savedName.is_favorite ? 'text-red-500' : 'text-gray-400'}
                        >
                          <Heart className="w-5 h-5" fill={savedName.is_favorite ? 'currentColor' : 'none'} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShare(savedName)}
                          className="text-gray-400 hover:text-blue-500"
                        >
                          <Share2 className="w-5 h-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(savedName.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
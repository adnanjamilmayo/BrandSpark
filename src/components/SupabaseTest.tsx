import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/clerk-react';

export function SupabaseTest() {
  const { user } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [testData, setTestData] = useState<any>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test reading
        const { data: readData, error: readError } = await supabase
          .from('name_generations')
          .select('*')
          .limit(1);

        if (readError) {
          throw readError;
        }

        // Test writing if user is logged in
        if (user) {
          const { data: writeData, error: writeError } = await supabase
            .from('name_generations')
            .insert([
              {
                user_id: user.id,
                name: 'Test Name',
                description: 'Test Description',
                is_favorite: false
              }
            ])
            .select();

          if (writeError) {
            throw writeError;
          }

          setTestData(writeData);
        }

        console.log('Supabase connection test successful:', { readData, testData });
        setStatus('success');
      } catch (err) {
        console.error('Supabase connection test failed:', err);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }

    testConnection();
  }, [user]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Supabase Connection Test</h3>
      <div>
        Status: {status === 'loading' ? '🔄 Testing...' : 
                status === 'success' ? '✅ Connected' : 
                '❌ Error'}
      </div>
      {error && (
        <div className="mt-2 text-red-600">
          Error: {error}
        </div>
      )}
      {testData && (
        <div className="mt-2 text-green-600">
          Test data inserted successfully!
        </div>
      )}
    </div>
  );
} 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Client, db } from "./index";

const CLIENTS_KEY = ["clients"];

export function useClients() {
  const queryClient = useQueryClient();

  const allClientsQuery = useQuery({
    queryKey: CLIENTS_KEY,
    queryFn: () => db.clients.toArray(),
  });

  const createClientMutation = useMutation({
    mutationFn: async (client: Client) => {
      const id = await db.clients.put(client);
      return db.clients.get(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: async (client: Client) => {
      if (!client.id) throw new Error("Client must have an ID");
      await db.clients.update(client.id, client);
      return db.clients.get(client.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    },
  });

  const deleteClientsMutation = useMutation({
    mutationFn: async (id: number) => {
      await db.clients.delete(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_KEY });
    }
  })

  const getClientById = async (id: number): Promise<Client | undefined> => {
    return db.clients.get(id);
  };

  return {
    allClients: allClientsQuery.data ?? [],
    isLoading: allClientsQuery.isLoading,
    error: allClientsQuery.error,
    refetch: allClientsQuery.refetch,

    createClient: createClientMutation.mutateAsync,
    updateClient: updateClientMutation.mutateAsync,
    deleteClientById: deleteClientsMutation.mutateAsync,

    getClientById,
  };
}


-- Create security definer function to check workspace ownership
CREATE OR REPLACE FUNCTION public.is_workspace_owner(workspace_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspaces
    WHERE id = workspace_id AND owner_id = user_id
  );
$$;

-- Create security definer function to check if workspace is accessible
CREATE OR REPLACE FUNCTION public.can_access_workspace(workspace_id uuid, user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspaces
    WHERE id = workspace_id 
    AND (owner_id = user_id OR is_public = true)
  );
$$;

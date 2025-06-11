
-- First, disable RLS temporarily to clear any cached policies
ALTER TABLE public.workspace_members DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies completely
DROP POLICY IF EXISTS "Users can view workspace members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can leave workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can view workspace members for their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can add members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and members can delete memberships" ON public.workspace_members;

-- Re-enable RLS
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- Create completely new, simplified policies
CREATE POLICY "workspace_members_select_policy"
  ON public.workspace_members
  FOR SELECT
  USING (
    user_id = auth.uid()
  );

CREATE POLICY "workspace_members_insert_policy"
  ON public.workspace_members
  FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL
  );

CREATE POLICY "workspace_members_update_policy"
  ON public.workspace_members
  FOR UPDATE
  USING (
    user_id = auth.uid()
  );

CREATE POLICY "workspace_members_delete_policy"
  ON public.workspace_members
  FOR DELETE
  USING (
    user_id = auth.uid()
  );

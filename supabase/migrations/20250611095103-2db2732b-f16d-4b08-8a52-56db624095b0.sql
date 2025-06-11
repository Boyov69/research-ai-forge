
-- Drop all existing policies for workspaces and workspace_members
DROP POLICY IF EXISTS "Users can view their own workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view public workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can update their own workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can delete their own workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can view accessible workspaces" ON public.workspaces;
DROP POLICY IF EXISTS "Users can create their own workspaces" ON public.workspaces;

DROP POLICY IF EXISTS "Users can view workspace members for their workspaces" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can add members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can update members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners and members can delete memberships" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can view workspace members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can leave workspaces" ON public.workspace_members;

-- Enable RLS on both tables
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for workspaces
CREATE POLICY "Users can view accessible workspaces"
  ON public.workspaces
  FOR SELECT
  USING (owner_id = auth.uid() OR is_public = true);

CREATE POLICY "Users can create their own workspaces"
  ON public.workspaces
  FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update their own workspaces"
  ON public.workspaces
  FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can delete their own workspaces"
  ON public.workspaces
  FOR DELETE
  USING (owner_id = auth.uid());

-- Create RLS policies for workspace_members
CREATE POLICY "Users can view workspace members"
  ON public.workspace_members
  FOR SELECT
  USING (
    user_id = auth.uid() 
    OR public.is_workspace_owner(workspace_id, auth.uid())
  );

CREATE POLICY "Workspace owners can manage members"
  ON public.workspace_members
  FOR ALL
  USING (public.is_workspace_owner(workspace_id, auth.uid()))
  WITH CHECK (public.is_workspace_owner(workspace_id, auth.uid()));

CREATE POLICY "Users can leave workspaces"
  ON public.workspace_members
  FOR DELETE
  USING (user_id = auth.uid());

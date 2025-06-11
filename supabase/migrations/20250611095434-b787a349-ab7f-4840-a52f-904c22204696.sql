
-- Drop the problematic policies and recreate them without recursion
DROP POLICY IF EXISTS "Users can view workspace members" ON public.workspace_members;
DROP POLICY IF EXISTS "Workspace owners can manage members" ON public.workspace_members;
DROP POLICY IF EXISTS "Users can leave workspaces" ON public.workspace_members;

-- Create simpler RLS policies for workspace_members that avoid recursion
CREATE POLICY "Users can view workspace members"
  ON public.workspace_members
  FOR SELECT
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM public.workspaces 
      WHERE id = workspace_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owners can manage members"
  ON public.workspace_members
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.workspaces 
      WHERE id = workspace_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owners can update members"
  ON public.workspace_members
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.workspaces 
      WHERE id = workspace_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can leave workspaces"
  ON public.workspace_members
  FOR DELETE
  USING (
    user_id = auth.uid() 
    OR EXISTS (
      SELECT 1 FROM public.workspaces 
      WHERE id = workspace_id AND owner_id = auth.uid()
    )
  );

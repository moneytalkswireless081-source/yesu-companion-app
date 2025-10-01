-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create device tokens table for push notifications
CREATE TABLE public.device_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL CHECK (platform IN ('android', 'ios', 'web')),
  device_info JSONB DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.device_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own device tokens"
ON public.device_tokens
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own device tokens"
ON public.device_tokens
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own device tokens"
ON public.device_tokens
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own device tokens"
ON public.device_tokens
FOR DELETE
USING (auth.uid() = user_id);

-- Create notifications log table
CREATE TABLE public.notifications_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  target_type TEXT NOT NULL CHECK (target_type IN ('user', 'broadcast')),
  target_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  sent_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for notifications log
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

-- Admin users can view all notifications
CREATE POLICY "Anyone can view notification logs"
ON public.notifications_log
FOR SELECT
USING (true);

-- Create triggers for updating timestamps
CREATE TRIGGER update_device_tokens_updated_at
BEFORE UPDATE ON public.device_tokens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notifications_log_updated_at
BEFORE UPDATE ON public.notifications_log
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_device_tokens_user_id ON public.device_tokens(user_id);
CREATE INDEX idx_device_tokens_active ON public.device_tokens(is_active) WHERE is_active = true;
CREATE INDEX idx_notifications_log_target_user_id ON public.notifications_log(target_user_id);
CREATE INDEX idx_notifications_log_created_at ON public.notifications_log(created_at DESC);
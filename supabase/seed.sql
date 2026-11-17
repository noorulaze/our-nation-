-- Nammude Naadu Seed Data (Realistic baseline data for local exploration)
-- Parent-Child Hierarchy: India -> Kerala -> Districts -> Localities/Towns

-- 1. COMMUNITIES HIERARCHY
-- Root: Country
INSERT INTO public.communities (id, name, name_ml, slug, description, description_ml, type, parent_id, district, latitude, longitude, member_count)
VALUES 
  ('10000000-0000-0000-0000-000000000001', 'India', 'ഭാരതം', 'india', 'Republic of India', 'ഇന്ത്യൻ റിപ്പബ്ലിക്', 'country', NULL, 'All', 20.5937, 78.9629, 1200)
ON CONFLICT (slug) DO NOTHING;

-- State: Kerala
INSERT INTO public.communities (id, name, name_ml, slug, description, description_ml, type, parent_id, district, latitude, longitude, member_count)
VALUES 
  ('20000000-0000-0000-0000-000000000001', 'Kerala', 'കേരളം', 'kerala', 'State of Kerala', 'ദൈവത്തിന്റെ സ്വന്തം നാട്', 'state', '10000000-0000-0000-0000-000000000001', 'All', 10.8505, 76.2711, 850)
ON CONFLICT (slug) DO NOTHING;

-- Districts
INSERT INTO public.communities (id, name, name_ml, slug, description, description_ml, type, parent_id, district, latitude, longitude, member_count)
VALUES 
  ('30000000-0000-0000-0000-000000000001', 'Ernakulam', 'എറണാകുളം', 'ernakulam', 'Commercial capital of Kerala', 'കേരളത്തിന്റെ വാണിജ്യ തലസ്ഥാനം', 'district', '20000000-0000-0000-0000-000000000001', 'Ernakulam', 9.9816, 76.2999, 420),
  ('30000000-0000-0000-0000-000000000002', 'Thiruvananthapuram', 'തിരുവനന്തപുരം', 'thiruvananthapuram', 'Capital city of Kerala', 'കേരളത്തിന്റെ തലസ്ഥാനം', 'district', '20000000-0000-0000-0000-000000000001', 'Thiruvananthapuram', 8.5241, 76.9366, 380),
  ('30000000-0000-0000-0000-000000000003', 'Kozhikode', 'കോഴിക്കോട്', 'kozhikode', 'City of spices and culture', 'സുഗന്ധവ്യഞ്ജനങ്ങളുടെയും സാംസ്കാരികതയുടെയും നഗരം', 'district', '20000000-0000-0000-0000-000000000001', 'Kozhikode', 11.2588, 75.7804, 310),
  ('30000000-0000-0000-0000-000000000004', 'Thrissur', 'തൃശ്ശൂർ', 'thrissur', 'Cultural capital of Kerala', 'കേരളത്തിന്റെ സാംസ്കാരിക തലസ്ഥാനം', 'district', '20000000-0000-0000-0000-000000000001', 'Thrissur', 10.5276, 76.2144, 290),
  ('30000000-0000-0000-0000-000000000005', 'Wayanad', 'വയനാട്', 'wayanad', 'Land of greenery and hills', 'ഹരിതാഭമായ മലയോര നാട്', 'district', '20000000-0000-0000-0000-000000000001', 'Wayanad', 11.6854, 76.1320, 195),
  ('30000000-0000-0000-0000-000000000006', 'Alappuzha', 'ആലപ്പുഴ', 'alappuzha', 'Venice of the East', 'കിഴക്കിന്റെ വെനീസ്', 'district', '20000000-0000-0000-0000-000000000001', 'Alappuzha', 9.4981, 76.3388, 230)
ON CONFLICT (slug) DO NOTHING;

-- Localities / Towns
INSERT INTO public.communities (id, name, name_ml, slug, description, description_ml, type, parent_id, district, latitude, longitude, member_count)
VALUES 
  ('40000000-0000-0000-0000-000000000001', 'Kakkanad', 'കാക്കനാട്', 'kakkanad', 'IT & administrative hub with Infopark and Collectorate', 'ഇൻഫോപാർക്കും കളക്ടറേറ്റും ഉൾപ്പെടുന്ന ഐടി ഹബ്ബ്', 'locality', '30000000-0000-0000-0000-000000000001', 'Ernakulam', 10.0159, 76.3419, 180),
  ('40000000-0000-0000-0000-000000000002', 'Fort Kochi', 'ഫോർട്ട് കൊച്ചി', 'fort-kochi', 'Historic coastal heritage town and arts destination', 'ചരിത്രപ്രസിദ്ധമായ തീരദേശ പൈതൃക നഗരവും കലാഗ്രാമവും', 'locality', '30000000-0000-0000-0000-000000000001', 'Ernakulam', 9.9658, 76.2421, 145),
  ('40000000-0000-0000-0000-000000000003', 'Kazhakkoottam', 'കഴക്കൂട്ടം', 'kazhakkoottam', 'Technopark cyber hub and gateway to the city', 'ടെക്നോപാർക്കും തലസ്ഥാനത്തിന്റെ ഐടി ഇടനാഴിയും', 'locality', '30000000-0000-0000-0000-000000000002', 'Thiruvananthapuram', 8.5686, 76.8731, 160),
  ('40000000-0000-0000-0000-000000000004', 'Palayam', 'പാളയം', 'palayam', 'Central cultural, university and market square', 'കേന്ദ്ര സാംസ്കാരിക, സർവകലാശാലാ, വ്യാപാര കേന്ദ്രം', 'locality', '30000000-0000-0000-0000-000000000002', 'Thiruvananthapuram', 8.5033, 76.9515, 110),
  ('40000000-0000-0000-0000-000000000005', 'Mananchira', 'മാനാഞ്ചിറ', 'mananchira', 'Heart of Calicut with historic tank and library square', 'ചരിത്രപ്രസിദ്ധമായ ചിറയും പബ്ലിക് ലൈബ്രറിയും ഉള്ള നഗരഹൃദയം', 'locality', '30000000-0000-0000-0000-000000000003', 'Kozhikode', 11.2520, 75.7797, 130),
  ('40000000-0000-0000-0000-000000000006', 'Kuttanad', 'കുട്ടനാട്', 'kuttanad', 'Rice bowl of Kerala below sea-level agricultural zone', 'സമുദ്രനിരപ്പിന് താഴെയുള്ള നെല്ലറയും കായലോരവും', 'panchayath', '30000000-0000-0000-0000-000000000006', 'Alappuzha', 9.4214, 76.4382, 95)
ON CONFLICT (slug) DO NOTHING;

-- 2. CATEGORIES
INSERT INTO public.categories (id, name, name_ml, slug, module, icon)
VALUES
  -- Events
  (gen_random_uuid(), 'Culture & Arts', 'കല & സംസ്കാരം', 'culture-arts', 'event', 'Palette'),
  (gen_random_uuid(), 'Workshops & Education', 'ശില്പശാല & വിദ്യാഭ്യാസം', 'education', 'event', 'GraduationCap'),
  (gen_random_uuid(), 'Sports & Fitness', 'കായികം & ഫിറ്റ്നസ്സ്', 'sports', 'event', 'Trophy'),
  (gen_random_uuid(), 'Charity & Volunteering', 'സാമൂഹിക സേവനം', 'charity', 'event', 'HeartHandshake'),
  (gen_random_uuid(), 'Festivals & Celebrations', 'ഉത്സവങ്ങൾ & ആഘോഷങ്ങൾ', 'festivals', 'event', 'Sparkles'),

  -- Businesses / Local Services
  (gen_random_uuid(), 'Home & Maintenance', 'വീട്ടുജോലി & അറ്റകുറ്റപ്പണി', 'home-maintenance', 'business', 'Wrench'),
  (gen_random_uuid(), 'Healthcare & Clinics', 'ആരോഗ്യ കേന്ദ്രങ്ങൾ', 'healthcare', 'business', 'Stethoscope'),
  (gen_random_uuid(), 'Food & Bakery', 'ഭക്ഷണശാല & ബേക്കറി', 'food-bakery', 'business', 'Utensils'),
  (gen_random_uuid(), 'Automotive Repairs', 'വാഹന റിപ്പയറിങ്', 'automotive', 'business', 'Car'),
  (gen_random_uuid(), 'Local Groceries', 'പലചരക്ക് കടകൾ', 'groceries', 'business', 'ShoppingBag'),
  (gen_random_uuid(), 'Professional Services', 'പ്രൊഫഷണൽ സേവനങ്ങൾ', 'professional', 'business', 'Briefcase'),

  -- Issue categories
  (gen_random_uuid(), 'Roads & Footpaths', 'റോഡുകളും നടപ്പാതകളും', 'roads', 'issue', 'AlertTriangle'),
  (gen_random_uuid(), 'Waste Management', 'മാലിന്യ സംസ്കരണം', 'waste-management', 'issue', 'Trash2'),
  (gen_random_uuid(), 'Water Supply & Drainage', 'കുടിവെള്ളവും ഡ്രെയിനേജും', 'water', 'issue', 'Droplets'),
  (gen_random_uuid(), 'Public Facilities & Streetlights', 'പൊതു സൗകര്യങ്ങളും വിളക്കുകളും', 'public-facilities', 'issue', 'Lightbulb'),
  (gen_random_uuid(), 'Environment & Trees', 'പരിസ്ഥിതിയും മരങ്ങളും', 'environment', 'issue', 'Trees'),
  (gen_random_uuid(), 'General Community Issues', 'മറ്റ് പ്രശ്നങ്ങൾ', 'other', 'issue', 'HelpCircle')
ON CONFLICT (slug) DO NOTHING;

import re

file_path = '/Users/t_u/Desktop/tavanbogd tech llc/tavan-bogd-tech/frontend/src/pages/Admin.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add import
if "import { toast } from 'react-toastify';" not in content:
    content = content.replace("import React,", "import React, { useEffect, useState, useMemo, useRef } from 'react';\nimport { toast } from 'react-toastify';\n//")
    content = re.sub(r"import React,.*?//", "import React, { useEffect, useState, useMemo, useRef } from 'react';\nimport { toast } from 'react-toastify';", content)

# Replace setSubmitStatus({ type: 'success', message: '...' }) with toast.success('...')
content = re.sub(r"setSubmitStatus\(\{\s*type:\s*'success',\s*message:\s*'(.*?)'\s*\}\);", r"toast.success('\1');", content)
content = re.sub(r"setSubmitStatus\(\{\s*type:\s*'error',\s*message:\s*'(.*?)'\s*\}\);", r"toast.error('\1');", content)
content = re.sub(r"setSubmitStatus\(\{\s*type:\s*'error',\s*message:\s*(.*?)\s*\}\);", r"toast.error(\1);", content)
content = re.sub(r"setSubmitStatus\(\{\s*type:\s*'',\s*message:\s*''\s*\}\);", r"// cleared status", content)

content = re.sub(r"setProfileSubmitStatus\(\{\s*type:\s*'success',\s*message:\s*'(.*?)'\s*\}\);", r"toast.success('\1');", content)
content = re.sub(r"setProfileSubmitStatus\(\{\s*type:\s*'error',\s*message:\s*(.*?)\s*\}\);", r"toast.error(\1);", content)
content = re.sub(r"setProfileSubmitStatus\(\{\s*type:\s*'',\s*message:\s*''\s*\}\);", r"// cleared status", content)

content = re.sub(r"setGenerateStatus\(\{\s*type:\s*'success',\s*message:\s*(.*?)\s*\}\);", r"toast.success(\1);", content)
content = re.sub(r"setGenerateStatus\(\{\s*type:\s*'error',\s*message:\s*(.*?)\s*\}\);", r"toast.error(\1);", content)
content = re.sub(r"setGenerateStatus\(\{\s*type:\s*'',\s*message:\s*''\s*\}\);", r"// cleared status", content)
content = re.sub(r"setTimeout\(\(\) => // cleared status, 5000\);", r"", content)

content = re.sub(r"setUserSubmitStatus\(\{\s*type:\s*'success',\s*message:\s*(.*?)\s*\}\);", r"toast.success(\1);", content)
content = re.sub(r"setUserSubmitStatus\(\{\s*type:\s*'error',\s*message:\s*(.*?)\s*\}\);", r"toast.error(\1);", content)
content = re.sub(r"setUserSubmitStatus\(\{\s*type:\s*'',\s*message:\s*''\s*\}\);", r"// cleared status", content)

content = re.sub(r"setSettingsStatus\(\{\s*type:\s*'success',\s*message:\s*'(.*?)'\s*\}\);", r"toast.success('\1');", content)
content = re.sub(r"setSettingsStatus\(\{\s*type:\s*'error',\s*message:\s*(.*?)\s*\}\);", r"toast.error(\1);", content)
content = re.sub(r"setSettingsStatus\(\{\s*type:\s*'',\s*message:\s*''\s*\}\);", r"// cleared status", content)
content = re.sub(r"setTimeout\(\(\) => // cleared status, 3000\);", r"", content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")

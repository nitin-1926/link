#!/bin/bash

echo "🔍 Verifying Link App Setup..."
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "❌ node_modules missing - run: npm install"
fi

# Check for key dependencies
if [ -d "node_modules/mcp-handler" ]; then
    echo "✅ mcp-handler installed"
else
    echo "❌ mcp-handler missing"
fi

if [ -d "node_modules/next" ]; then
    echo "✅ next installed"
else
    echo "❌ next missing"
fi

# Check for .env.local
if [ -f ".env.local" ]; then
    echo "✅ .env.local exists"
else
    echo "⚠️  .env.local missing - create it from ENV_SETUP.md"
fi

# Check for .prettierrc
if [ -f ".prettierrc" ]; then
    echo "✅ .prettierrc configured"
else
    echo "❌ .prettierrc missing"
fi

echo ""
echo "📝 Next steps:"
echo "1. Create .env.local (see ENV_SETUP.md)"
echo "2. Run: npm install"
echo "3. Restart TypeScript server in your IDE (CMD+Shift+P -> Restart TypeScript Server)"
echo "4. Run: npm run dev"


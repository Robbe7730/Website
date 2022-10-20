npx vite build
cd dist
git add .
git commit -m "Automated commit"
git push
. <(ssh-agent)
ssh-add
ssh deacoo << EOF
  cd data/static/root
  git pull
EOF

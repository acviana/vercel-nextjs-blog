build:
	npm run build

create-page:
	cp -vn template.md pages/posts/$(title).md

check-packages:
	npm outdated

install-packages:
	npm install

update-packages:
	npm update 

run-local:
	npm run dev

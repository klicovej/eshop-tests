# eshop-tests

## Úvod
- Před implementací samotných testů musíme zvolit nástroj, který k tomu použijeme
- Je několik kritérií, která je potřeba brát v potaz:
   * Plánujeme spouštět testy ve všech prohlížečích nebo se spokojíme např. s Chromem, případně které jiné prohlížeče jsou pro nás důležité?
   * Musíme počítat i s omezením některých testovacích frameworků 
      - jako např. budemete testovat aplikaci ve více záložkách prohlížeče? jsou v aplikaci použity <iframe> ?
   * Budou se psaní testů kromě QAs věnovat i programátoři? 
      - pak by bylo dobré jazyk pro psaní testů sjednotit s tím, který sami používají
   * Jak budeme řešit reportování výsledků?
      - můžeme si dovolit zaplatit některé komerční řešení nebo budeme chtít používat free
   * Musíme prozkoumat náš CI/CD tool a zjistit, jak vytvořit pipeline pro jejich automatické spouštění
   * Jak často chceme testy nechat běžet? Při každém mergi/jednou denně/...?
 
## Řešení
- Vytvořil sem zjednodušený nárvh řešení tak, jak by to šlo implementovat použitím Cypressu
  
1. Spouštění testů pro více než jeden eshop
   - Cypress umožňuje pomocí `Environment Variables` definovat proměnné vztahující se k jednomu prostředí a přepínat mezi nimi
   - příklad se nachází ve složce `cypress/environments`
   - v souboru se nachází i informace s přístupovými údaji uživatelů, takže se s nimi můžeme přihlašovat jako uživatel s různými oprávněními
  
2. Data používaná v testech se liší, známe je ale dopředu, tedy se mezi nimi díky `Environment Variables` můžeme přepínat také
   - Cypress nabízí pro práci s data command `fixture` pomocí něhož data načteme
     
4. Webová aplikace obsahuje několik různých stránek a pro každou z nich vytvoříme třídu, která bude obsahovat elementy stránky, případně další potřebné metody (třídy jsou ve složce `cypress/pageObjects/

5. V zadání je zmíněná stránku Profilu, která obsahuje informace o skladu, seznam zboží, zásob, přihrádek a dalších dat ve skladu e-shopu. Ta odpovídá třídě `pageObjects/Profile.js`

6. V rámci stránky je potřeba pracovat s několika seznamy, proto byla vytvořena ještě obecná třída `List`, pro získávání řádku seznamu

## Věci ke zlepšení

1. Třída `List` by byla `superclass` pro třídy typu `Seznam zboží`, `Seznam zásob`, `Seznam přihrádek` tyto třídy by pak měly metody specifické jen pro daný seznam

2. Data ze seznamů, která získáváme ať už ze souboru nebo databáze by se měla mapovat do objektů, aby práce s nimi byla snažší. Takže pro všechny skladové položky typu zboží, zásoby, příhrádka by se vytvořili třídy obsahující fieldy a metody pro práci s nimi.

3. Zároveň by se vytvořila třída pro uživatele a ostatní třídy typu manager, pracovník by z ní dědili, aby měli přístup pouze k údajům (fieldům, metodám), na které mají opravnění
   
   
   

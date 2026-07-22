oo![1784594638052](image/configuration-marketing-automation-odoo/1784594638052.png)

# Configuration Marketing Automation Odoo — Tunnel de vente MFinances

## Vue d'ensemble

Le site MFinances capture des leads via 4 outils interactifs. Chaque outil envoie un lead dans le CRM Odoo avec un **tag CRM** spécifique. Odoo Marketing Automation lance automatiquement une séquence de 5 emails sur 30 jours basée sur ce tag.

```
Visiteur → Outil sur le site → Lead CRM + tag → Marketing Automation → 5 emails
```

---

## Etape 1 : Créer les 4 tags CRM

**Aller dans** : CRM → Configuration → Etiquettes (Tags)

Créer ces 4 tags exactement (les noms doivent correspondre au code) :

| Tag (nom exact)               | Outil correspondant            | Séquence |
| ----------------------------- | ------------------------------ | --------- |
| `seq_diagnostic_tresorerie` | Diagnostic Trésorerie         | A         |
| `seq_generateur_bail`       | Générateur de Bail Pro       | B         |
| `seq_calculateur_bureau`    | Calculateur Bureau à Domicile | C         |
| `seq_checklist_fiscale`     | Checklist Contrôle Fiscal     | D         |

Tag supplémentaire (pour après les séquences) :
| `newsletter_mensuelle` | Ajouté automatiquement après le dernier email (J+30) |

> Les tags sont créés automatiquement par l'API si ils n'existent pas, mais les créer manuellement permet de les vérifier.

---

## Etape 2 : Créer les 4 campagnes Marketing Automation

**Aller dans** : Marketing Automation → Campagnes → Nouveau

### Bouton CTA (HTML à réutiliser dans les emails)

```html
<a href="https://odoo.mfinances.be/appointment/11"
   style="display:inline-block;background:#124d5a;color:#ffffff;
          padding:14px 28px;border-radius:6px;text-decoration:none;
          font-weight:600;font-family:Arial,sans-serif;font-size:16px;">
  Réserver mon diagnostic de 30 minutes
</a>
```

Pour le dernier email de chaque séquence, remplacer le texte du bouton par : `Réserver un échange`

### Signature (HTML à placer en bas de chaque email)

```html
<p style="margin-top:24px;">
  <strong>Mika</strong><br>
  Expert-comptable & Conseil financier<br>
  <strong>Mfinances</strong>
</p>
```

---

---

## CAMPAGNE A — Diagnostic Trésorerie

**Configuration de base :**

- **Nom** : Séquence Diagnostic Trésorerie
- **Modèle cible** : Lead/Opportunité (`crm.lead`)
- **Filtre** : `Etiquettes` → `contient` → `seq_diagnostic_tresorerie`
- **Unicité** : par adresse email (éviter les doublons)

---

### A1 · Envoi : immédiat (J0)

**Objet :** Votre diagnostic trésorerie est prêt — vos résultats et les premières pistes

**Corps :**

Bonjour {{ object.contact_name }},

Votre diagnostic trésorerie est prêt. Vous trouverez ci-dessous une synthèse personnalisée de votre situation, avec les principaux points de vigilance identifiés et les premières pistes d'amélioration.

{{ object.description }}

Ces résultats constituent une première photographie de votre trésorerie. Ils permettent d'identifier des signaux d'alerte ou des opportunités d'amélioration, mais ils ne peuvent pas tenir compte de toutes les spécificités de votre entreprise : votre activité, vos projets de développement, vos échéances ou encore votre organisation financière.

La question la plus importante reste donc la suivante : **Quel impact ces éléments pourraient-ils avoir sur votre entreprise dans les prochains mois ?**

C'est précisément l'objectif du diagnostic de 30 minutes que je propose aux dirigeants de PME. Au cours de cet échange, nous reprenons ensemble vos résultats, nous les remettons dans leur contexte et nous identifions les actions prioritaires qui pourraient améliorer votre visibilité financière ou sécuriser votre trésorerie.

Vous repartirez avec des recommandations concrètes, que vous décidiez ou non de poursuivre un accompagnement avec Mfinances.

Bonne lecture,

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### A2 · Envoi : J+2

**Objet :** Ce que les chiffres ne disent pas toujours

**Corps :**

Bonjour {{ object.contact_name }},

Il est fréquent qu'un dirigeant me confie la même chose : « Notre activité se développe, les résultats sont corrects… mais j'ai toujours cette impression de manquer de visibilité sur ma trésorerie. »

Cette situation est plus courante qu'on ne le pense. Les chiffres que vous consultez chaque mois sont essentiels pour comprendre ce qui s'est passé. En revanche, ils permettent rarement d'anticiper les tensions qui peuvent apparaître dans les semaines ou les mois à venir.

Au fil des accompagnements que nous réalisons auprès de dirigeants de PME, trois situations reviennent régulièrement :

**Les délais de paiement des clients** sont souvent plus longs qu'ils ne paraissent. Quelques jours supplémentaires suffisent parfois à déséquilibrer une trésorerie.

**Les charges fixes évoluent progressivement** avec la croissance de l'entreprise : nouveaux collaborateurs, investissements, abonnements ou loyers. Leur impact est rarement perceptible immédiatement.

**Le besoin en fonds de roulement augmente** lorsque l'activité se développe. Plus l'entreprise vend, plus elle doit financer son cycle d'exploitation avant d'encaisser ses ventes.

Pris isolément, ces éléments semblent généralement maîtrisables. Mais lorsqu'ils se cumulent, ils peuvent progressivement réduire votre marge de manœuvre, retarder certains projets ou vous obliger à prendre des décisions dans l'urgence.

Si votre diagnostic a mis en évidence l'un de ces points, il ne s'agit pas nécessairement d'un problème aujourd'hui. En revanche, c'est un signal qui mérite d'être suivi avec attention avant qu'il ne produise ses effets.

Notre expérience montre qu'une entreprise rencontre rarement des difficultés de trésorerie du jour au lendemain. Elles s'installent progressivement, souvent sans que le dirigeant ne s'en aperçoive. C'est précisément pour cette raison qu'un suivi régulier et une bonne visibilité financière font toute la différence.

Je vous souhaite une excellente journée.

**CTA :** aucun (email de contenu uniquement)

---

### A3 · Envoi : J+7

**Objet :** Comment une PME de Liège a évité une rupture de trésorerie

**Corps :**

Bonjour {{ object.contact_name }},

J'aimerais vous partager une situation que nous avons accompagnée l'an dernier. Le dirigeant d'une entreprise de services située à Liège, comptant une douzaine de collaborateurs, nous a contactés avec une préoccupation simple : son chiffre d'affaires était stable, l'activité se développait, mais sa trésorerie semblait se dégrader chaque mois sans raison apparente.

En analysant son fonctionnement, nous avons rapidement constaté que le problème ne venait pas d'un manque de rentabilité. Trois décalages se cumulaient progressivement : les factures étaient émises plusieurs jours après la réalisation des prestations ; certains clients réglaient systématiquement au-delà des délais prévus ; plusieurs échéances fournisseurs intervenaient avant les principaux encaissements.

Pris séparément, ces écarts semblaient anodins. Ensemble, ils créaient une tension permanente sur la trésorerie et obligeaient le dirigeant à prendre ses décisions avec une visibilité très limitée.

En quelques semaines, nous avons revu son processus de facturation, renégocié certaines conditions de paiement et mis en place un tableau de pilotage simple, qu'il consulte aujourd'hui chaque lundi matin en une dizaine de minutes.

Le résultat n'a pas été spectaculaire parce qu'il reposait sur une solution miracle. Il a simplement retrouvé une visibilité à près de 90 jours sur sa trésorerie, ce qui lui permet aujourd'hui d'anticiper ses besoins, de planifier ses investissements et de gérer son entreprise avec beaucoup plus de sérénité.

Si, en lisant cette situation, vous avez le sentiment de reconnaître certains aspects de votre propre entreprise, je vous propose d'en discuter ensemble. En 30 minutes, nous pourrons analyser vos résultats et identifier les actions qui pourraient améliorer durablement votre visibilité financière.

Au plaisir d'échanger avec vous.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### A4 · Envoi : J+14 (lien croisé → Calculateur Bureau)

**Objet :** Un outil complémentaire qui pourrait vous être utile

**Corps :**

Bonjour {{ object.contact_name }},

Depuis votre diagnostic trésorerie, j'espère que vous avez eu l'occasion de prendre un peu de recul sur votre situation.

En échangeant avec des dirigeants de PME, je constate qu'un autre sujet est souvent laissé de côté : les frais professionnels qui pourraient être déduits fiscalement, mais qui ne sont pas toujours correctement évalués. C'est notamment le cas lorsque vous travaillez, même partiellement, depuis votre domicile ou que vous utilisez votre véhicule à des fins professionnelles.

Pour aider les dirigeants à obtenir une première estimation, nous avons développé un calculateur simple qui vous permet d'évaluer, en quelques minutes, les déductions fiscales auxquelles vous pourriez prétendre. L'utilisation est gratuite, ne nécessite aucune inscription et le résultat est obtenu en moins de trois minutes.

Accéder au calculateur : https://mfinances.be/ressources/calculateur-bureau/

Même si cette estimation ne remplace pas une analyse personnalisée, elle constitue un bon point de départ pour vérifier que vous ne passez pas à côté d'économies auxquelles vous pourriez avoir droit.

Si une question se pose à la lecture de vos résultats, je serai naturellement disponible pour en discuter.

Je vous souhaite une excellente journée.

**CTA :** lien texte vers le calculateur (pas de bouton RDV)

---

### A5 · Envoi : J+30

**Objet :** Je reste disponible si le moment est venu

> Dernier email de la séquence. Après envoi : poser le tag `newsletter_mensuelle` sur le lead.

**Corps :**

Bonjour {{ object.contact_name }},

Voilà un mois que vous avez réalisé votre diagnostic de trésorerie. J'espère que les informations obtenues vous auront permis d'y voir plus clair et d'identifier quelques pistes de réflexion pour votre entreprise.

Chez MFinances, nous préférons laisser à chaque dirigeant le temps d'avancer à son rythme. C'est donc le dernier email que vous recevrez dans le cadre de ce diagnostic.

Si, entre-temps, votre situation a évolué, si une question se pose ou si vous souhaitez bénéficier d'un regard extérieur sur votre trésorerie et votre organisation financière, je serai heureux d'en discuter avec vous.

Un échange de 30 minutes permet souvent de faire le point, de répondre à vos interrogations et d'identifier les actions les plus pertinentes pour votre entreprise, sans engagement de votre part.

La décision vous appartient, mais sachez que ma porte reste ouverte lorsque vous en ressentirez le besoin.

Je vous souhaite une pleine réussite dans le développement de votre entreprise.

**CTA :** [Bouton "Réserver un échange"]

---

---

## CAMPAGNE B — Générateur de Bail Professionnel

**Configuration de base :**

- **Nom** : Séquence Générateur Bail
- **Modèle cible** : Lead/Opportunité (`crm.lead`)
- **Filtre** : `Etiquettes` → `contient` → `seq_generateur_bail`

---

### B1 · Envoi : immédiat (J0)

**Objet :** Votre bail professionnel est prêt

**Corps :**

Bonjour {{ object.contact_name }},

Votre bail professionnel a bien été généré. Vous le trouverez en pièce jointe de cet email.

Avant de le signer ou de le transmettre, je vous conseille de prendre quelques minutes pour relire attentivement certains points. Cette simple vérification peut éviter bien des difficultés par la suite.

Je vous recommande de porter une attention particulière à trois éléments :

**La durée du bail et les conditions de renouvellement**, afin d'éviter toute mauvaise surprise à l'échéance.

**La répartition des charges, des travaux et des responsabilités**, qui peut avoir un impact financier important pendant toute la durée du bail.

**Les modalités de résiliation**, pour connaître vos possibilités si votre activité évolue ou si vous devez quitter les lieux plus tôt que prévu.

Dans notre pratique, ce sont souvent ces clauses qui donnent lieu à des incompréhensions ou à des coûts imprévus lorsqu'elles n'ont pas été suffisamment analysées avant la signature.

Si un point vous semble peu clair ou soulève une question, n'hésitez pas à me solliciter. Quelques minutes d'échange peuvent parfois éviter des conséquences financières ou fiscales importantes.

Je vous souhaite une excellente lecture.

**CTA :** aucun (email de livraison)

---

### B2 · Envoi : J+2

**Objet :** Les 3 erreurs les plus coûteuses dans un bail professionnel

**Corps :**

Bonjour {{ object.contact_name }},

Au fil de nos accompagnements auprès de dirigeants de PME, nous constatons que certains baux professionnels peuvent avoir des conséquences financières importantes, simplement parce que certaines clauses n'ont pas été suffisamment analysées avant leur signature.

Trois points méritent une attention particulière.

**1. Choisir un type de bail inadapté à son activité**
Selon la nature de votre activité, le bail applicable peut être différent. Ce choix influence notamment vos droits, vos obligations et les possibilités de renouvellement. Il est donc important de s'assurer que le contrat correspond bien à votre situation.

**2. Sous-estimer le coût réel des charges**
Au-delà du loyer, certaines clauses prévoient la prise en charge de frais complémentaires : entretien, réparations, taxes ou charges communes. Ces coûts peuvent représenter une part importante de votre budget annuel s'ils ne sont pas clairement identifiés dès le départ.

**3. Négliger les mécanismes d'indexation**
Une clause d'indexation peut faire évoluer le montant du loyer au fil des années. Dans un contexte économique fluctuant, il est utile d'en mesurer l'impact afin d'éviter une augmentation progressive de vos charges fixes.

Ces éléments ne remettent pas nécessairement en cause un bail. En revanche, les comprendre avant de signer permet souvent d'éviter des coûts imprévus et de prendre une décision en toute connaissance de cause.

Je vous souhaite une excellente journée.

**CTA :** aucun (email de contenu uniquement)

---

### B3 · Envoi : J+7

**Objet :** Bail professionnel et fiscalité : ce que peu de dirigeants savent

**Corps :**

Bonjour {{ object.contact_name }},

Lorsqu'un dirigeant signe un bail professionnel, son attention se porte naturellement sur le montant du loyer, la durée du contrat ou encore les charges. En revanche, les conséquences fiscales du bail sont souvent examinées bien plus tard… parfois lorsqu'il est déjà trop tard pour les optimiser.

Selon votre situation, plusieurs éléments peuvent avoir un impact sur la fiscalité de votre entreprise ou sur votre imposition personnelle : la manière dont le bien est occupé, la répartition des loyers et des charges, ou encore les relations entre le propriétaire, la société et son dirigeant.

Ces situations ne présentent pas nécessairement de difficulté, mais elles méritent d'être analysées avant la signature afin de s'assurer que le bail est cohérent avec votre organisation et qu'il ne génère pas de conséquences fiscales inattendues.

C'est précisément l'un des rôles de l'expert-comptable : vérifier que les choix effectués sont adaptés à votre situation et vous alerter lorsque certains points méritent une attention particulière.

Si vous souhaitez faire relire votre bail ou échanger sur ses implications financières et fiscales, je serai heureux d'en discuter avec vous.

À bientôt,

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### B4 · Envoi : J+14 (lien croisé → Checklist Contrôle Fiscal)

**Objet :** Un outil pour aller plus loin

**Corps :**

Bonjour {{ object.contact_name }},

Au-delà de la rédaction d'un bail professionnel, il est utile de garder à l'esprit que certains engagements pris par une entreprise peuvent également avoir des conséquences lors d'un contrôle fiscal.

Sans parler de votre situation en particulier, notre expérience montre que les dirigeants apprécient de pouvoir vérifier, de manière simple, les principaux points sur lesquels l'administration fiscale porte généralement son attention.

C'est pourquoi nous mettons gratuitement à disposition une **Checklist Contrôle Fiscal**. Elle reprend les **20 points les plus fréquemment examinés** lors d'un contrôle fiscal de PME, avec, pour chacun d'eux, les éléments à vérifier afin de mieux préparer votre entreprise.

Que votre société soit récente ou bien établie, cette checklist vous permettra d'identifier rapidement les points qui méritent une attention particulière.

Télécharger la Checklist Contrôle Fiscal : https://mfinances.be/ressources/checklist-controle-bureau/

J'espère qu'elle vous sera utile. Et si certaines questions se posent à sa lecture, je serai naturellement disponible pour en discuter avec vous.

Je vous souhaite une excellente journée.

**CTA :** lien texte vers la checklist (pas de bouton RDV)

---

### B5 · Envoi : J+30

**Objet :** Si votre situation a évolué

> Dernier email de la séquence. Après envoi : poser le tag `newsletter_mensuelle` sur le lead.

**Corps :**

Bonjour {{ object.contact_name }},

Voilà maintenant un mois que vous avez généré votre bail professionnel. J'espère qu'il vous a été utile et qu'il vous a permis d'avancer sereinement dans votre projet.

Cet email marque la fin de cette série de messages. Chez MFinances, nous préférons laisser à chaque dirigeant le temps de prendre ses décisions, sans multiplier les relances.

Si, depuis, votre situation a évolué ou si certaines questions se posent concernant votre bail, ses implications financières ou fiscales, je serai heureux d'échanger avec vous.

Un entretien de 30 minutes permet souvent de faire le point, de répondre à vos interrogations et de vous apporter un regard extérieur sur votre situation, sans engagement.

La décision vous appartient, mais sachez que je resterai disponible si vous en ressentez le besoin.

Je vous souhaite beaucoup de réussite dans le développement de votre activité.

**CTA :** [Bouton "Réserver un échange"]

---

---

## CAMPAGNE C — Calculateur Bureau à Domicile

**Configuration de base :**

- **Nom** : Séquence Calculateur Bureau
- **Modèle cible** : Lead/Opportunité (`crm.lead`)
- **Filtre** : `Etiquettes` → `contient` → `seq_calculateur_bureau`

---

### C1 · Envoi : immédiat (J0)

**Objet :** Votre estimation de déduction fiscale est disponible

**Corps :**

Bonjour {{ object.contact_name }},

Votre estimation de déduction fiscale est prête. Vous trouverez ci-dessous le résultat calculé à partir des informations que vous avez renseignées concernant l'utilisation professionnelle de votre bureau à domicile.

{{ object.description }}

Cette estimation constitue une première indication. Elle est basée sur les informations que vous avez fournies et ne peut pas prendre en compte certains éléments propres à votre situation, tels que votre statut, votre régime fiscal, la nature de votre activité ou d'autres frais professionnels qui pourraient également être déductibles. C'est pourquoi le montant réellement déductible peut différer de cette première estimation.

Si vous souhaitez vérifier que vous appliquez les bonnes règles ou savoir si d'autres frais peuvent être pris en compte, je serai heureux d'en discuter avec vous. L'objectif est simplement de vous aider à optimiser votre situation fiscale en toute sécurité.

Je vous souhaite une excellente lecture.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### C2 · Envoi : J+2

**Objet :** Ce que votre calculateur ne peut pas mesurer

**Corps :**

Bonjour {{ object.contact_name }},

Le calculateur que vous avez utilisé vous donne une première estimation fiable. En revanche, il ne peut pas tenir compte de toutes les particularités de votre situation.

Par exemple, les règles applicables ne sont pas les mêmes selon que vous exercez votre activité en société ou en personne physique. D'autres éléments peuvent également influencer le montant réellement déductible : la superficie de votre bureau, votre statut de propriétaire ou de locataire, ou encore la nature des dépenses engagées.

Au-delà du bureau lui-même, certaines charges peuvent également être prises en compte lorsqu'elles sont directement liées à votre activité professionnelle : internet, chauffage, électricité, assurance habitation ou encore certains équipements.

L'essentiel est de trouver le bon équilibre. Dans notre pratique, nous rencontrons régulièrement deux situations : des dirigeants qui renoncent à certaines déductions par prudence et paient plus d'impôts que nécessaire ; d'autres qui appliquent des déductions trop importantes, s'exposant à des difficultés en cas de contrôle fiscal.

L'objectif n'est pas de déduire davantage à tout prix. L'objectif est d'appliquer les règles correctement, afin d'optimiser votre fiscalité en toute sécurité.

Je vous souhaite une excellente journée.

**CTA :** aucun (email de contenu uniquement)

---

### C3 · Envoi : J+7

**Objet :** Les déductions que la plupart des dirigeants oublient

**Corps :**

Bonjour {{ object.contact_name }},

Au fil de nos accompagnements auprès de dirigeants de PME, nous constatons que certaines dépenses professionnelles ne sont pas toujours prises en compte de manière optimale lors de l'établissement de leur déclaration. Pourtant, ces oublis peuvent avoir un impact non négligeable sur le résultat fiscal de l'entreprise.

Voici trois situations que nous rencontrons régulièrement :

**Les frais de déplacement professionnel**
Lorsqu'ils ne sont pas correctement suivis ou documentés, une partie de ces frais peut ne pas être prise en compte.

**Les investissements réalisés par l'entreprise**
Selon la nature des équipements acquis et la réglementation applicable, certains investissements peuvent ouvrir droit à des avantages fiscaux qui sont parfois méconnus ou identifiés trop tard.

**Les dépenses de formation**
Les formations suivies dans le cadre de l'activité professionnelle sont parfois insuffisamment valorisées, alors qu'elles peuvent être prises en compte sous certaines conditions.

Pris individuellement, ces montants peuvent sembler limités. Mais, cumulés sur une année, ils peuvent représenter plusieurs milliers d'euros d'écart pour une entreprise.

Chaque situation étant différente, un simple point de vérification permet souvent de s'assurer que les dépenses professionnelles ont bien été identifiées et traitées conformément aux règles applicables.

Si vous souhaitez faire le point sur votre situation, je serai ravi d'en discuter avec vous.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### C4 · Envoi : J+14

**Objet :** Comment un dirigeant a pu récupérer 4 200 € après une revue de sa situation fiscale

**Corps :**

Bonjour {{ object.contact_name }},

Au cours de l'un de nos accompagnements, nous avons réalisé une revue de la situation fiscale d'un consultant indépendant basé à Bruxelles. Depuis plusieurs années, il appliquait la déduction liée à son bureau à domicile, mais certaines dépenses professionnelles n'avaient pas été prises en compte de manière optimale.

En reprenant son dossier dans son ensemble, nous avons identifié plusieurs éléments qui pouvaient encore être valorisés, notamment des frais liés à son activité, certains abonnements professionnels ainsi que des investissements réalisés au cours des années précédentes.

Après régularisation, le montant récupéré s'est élevé à **4 200 €**.

Bien entendu, chaque situation est différente et les montants varient selon les dépenses engagées et les justificatifs disponibles. En revanche, cette expérience illustre qu'une revue approfondie permet souvent d'identifier des opportunités qui seraient autrement passées inaperçues.

Si vous souhaitez vérifier que votre situation a bien été optimisée, je serai ravi d'en discuter avec vous.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### C5 · Envoi : J+30

**Objet :** Dernier message de ma part

> Dernier email de la séquence. Après envoi : poser le tag `newsletter_mensuelle` sur le lead.

**Corps :**

Bonjour {{ object.contact_name }},

C'est le dernier message que je vous adresse à ce sujet.

Si vous avez consulté votre estimation de déduction mais que vous n'avez pas encore souhaité aller plus loin, c'est parfaitement compréhensible. Les priorités d'un dirigeant évoluent constamment et certaines décisions demandent simplement le bon moment.

Si vous souhaitez un jour faire le point sur votre situation fiscale, je reste à votre disposition. Dans la plupart des cas, un échange de 30 minutes permet déjà d'identifier d'éventuelles pistes d'optimisation, de vérifier que les principaux postes de dépenses sont correctement pris en compte et de répondre aux questions que vous pourriez avoir concernant votre situation.

Il ne s'agit pas de modifier ce qui fonctionne déjà, mais simplement de s'assurer qu'aucune opportunité légitime n'est laissée de côté.

Je vous remercie pour le temps que vous avez accordé à cette série d'emails.

Au plaisir d'échanger avec vous, le moment venu.

**CTA :** [Bouton "Réserver un échange"]

---

---

## CAMPAGNE D — Checklist Contrôle Fiscal

**Configuration de base :**

- **Nom** : Séquence Checklist Contrôle Fiscal
- **Modèle cible** : Lead/Opportunité (`crm.lead`)
- **Filtre** : `Etiquettes` → `contient` → `seq_checklist_fiscale`

---

### D1 · Envoi : immédiat (J0)

**Objet :** Votre checklist contrôle fiscal — les 20 points essentiels

**Corps :**

Bonjour {{ object.contact_name }},

Votre checklist contrôle fiscal est disponible en pièce jointe de cet email.

Elle rassemble 20 points qui méritent une attention particulière lors de la préparation d'un contrôle fiscal d'une PME ou d'une TPE. Pour chacun d'eux, vous trouverez une indication sur le niveau de vigilance ainsi que les éléments qu'il est utile de pouvoir justifier.

Je vous conseille de commencer par les points identifiés comme les plus sensibles. Ils correspondent généralement aux situations qui nécessitent une documentation ou des justificatifs particulièrement complets.

Cette checklist n'a pas vocation à être source d'inquiétude. Elle a été conçue pour vous aider à vérifier que votre dossier est complet et à identifier, si nécessaire, les points qui méritent d'être revus avant qu'un contrôle n'intervienne.

Si certains éléments vous semblent peu clairs ou soulèvent des questions, n'hésitez pas à me solliciter. Un échange permet souvent de lever les incertitudes et de s'assurer que votre dossier est correctement préparé.

Je vous souhaite une excellente lecture.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### D2 · Envoi : J+2

**Objet :** Les 3 points de la checklist les plus souvent négligés

**Corps :**

Bonjour {{ object.contact_name }},

En accompagnant des PME belges face à des contrôles fiscaux, nous avons constaté que trois points de la checklist sont systématiquement sous-estimés.

Le premier concerne la documentation des avantages en nature — voiture de société, gsm, frais de représentation. L'administration contrôle précisément la cohérence entre ce qui est déclaré et ce qui est réellement utilisé.

Le deuxième porte sur la justification des frais professionnels mixtes, c'est-à-dire les dépenses à la fois personnelles et professionnelles. Sans documentation précise, ils sont souvent requalifiés.

Le troisième est la cohérence entre les déclarations TVA et les déclarations à l'impôt des sociétés. Des écarts, même minimes, peuvent déclencher une vérification approfondie.

Ces trois points méritent une attention particulière.

**CTA :** aucun (email de contenu uniquement)

---

### D3 · Envoi : J+7

**Objet :** Comment se préparer à un contrôle fiscal en 4 étapes

**Corps :**

Bonjour {{ object.contact_name }},

Au fil de nos accompagnements auprès de dirigeants de PME, nous constatons que certains points méritent une vigilance particulière lorsqu'il s'agit de préparer un dossier fiscal.

En voici trois qui reviennent régulièrement.

**1. Les avantages en nature**
Lorsqu'une entreprise met à disposition une voiture de société, un téléphone ou d'autres avantages, il est important que leur traitement soit cohérent avec les justificatifs disponibles et les déclarations effectuées.

**2. Les frais à usage mixte**
Certaines dépenses peuvent avoir un usage à la fois professionnel et privé. Il est donc essentiel de pouvoir justifier leur traitement et de conserver les pièces nécessaires lorsque la réglementation l'exige.

**3. La cohérence des déclarations**
Les informations reprises dans les différentes déclarations de l'entreprise doivent être cohérentes entre elles. Une vérification en amont permet souvent d'identifier d'éventuelles incohérences avant leur dépôt.

Ces points ne posent pas nécessairement de difficulté. En revanche, les vérifier régulièrement contribue à sécuriser votre dossier et à aborder plus sereinement vos obligations fiscales.

Je vous souhaite une excellente journée.

**CTA :** [Bouton "Réserver mon diagnostic de 30 minutes"]

---

### D4 · Envoi : J+14 (lien croisé → Diagnostic Trésorerie)

**Objet :** Un complément utile à votre checklist

**Corps :**

Bonjour {{ object.contact_name }},

J'espère que votre checklist contrôle fiscal vous sera utile pour faire le point sur les principaux éléments de vigilance de votre dossier.

Si vous souhaitez aller plus loin, nous mettons également à votre disposition un Diagnostic Trésorerie.

En quelques minutes, il vous permet d'obtenir une vision plus claire de votre situation de trésorerie et d'identifier certains points qui peuvent mériter une attention particulière dans le pilotage de votre entreprise.

Comme pour la checklist, l'objectif est simple : vous aider à prendre vos décisions avec une meilleure visibilité.

Le diagnostic est gratuit, ne nécessite aucune inscription et se réalise en moins de dix minutes.

Accéder au Diagnostic Trésorerie : https://mfinances.be/diagnostic/

Je vous en souhaite une bonne utilisation.

**CTA :** lien texte vers le diagnostic (pas de bouton RDV)

---

### D5 · Envoi : J+30

**Objet :** Je reste à votre disposition

> Dernier email de la séquence. Après envoi : poser le tag `newsletter_mensuelle` sur le lead.

**Corps :**

Bonjour {{ object.contact_name }},

C'est mon dernier message à propos de votre checklist contrôle fiscal.

J'espère qu'elle vous aura permis d'identifier les principaux points de vigilance de votre dossier et de mieux préparer vos obligations fiscales.

Si vous souhaitez faire le point sur votre situation, je reste à votre disposition.

Au quotidien, nous accompagnons des dirigeants de PME dans le suivi de leurs obligations comptables, fiscales et financières, afin de les aider à sécuriser leurs démarches et à prendre leurs décisions avec davantage de sérénité.

Un échange de quelques minutes permet souvent d'identifier les points qui méritent une attention particulière et de répondre à vos éventuelles questions.

Au plaisir d'échanger avec vous.

**CTA :** [Bouton "Réserver un échange"]

---

---

## Etape 3 : Configurer les conditions d'arrêt

Sur **chaque activité email** (sauf J0), ajouter un filtre d'exclusion :

1. Cliquer sur l'activité email dans le workflow
2. Dans **Filtre de domaine** (ou "Filtres supplémentaires"), ajouter :
   - `Etape` → `n'est pas égal à` → `Gagné` (Won)

**Option avancée** : Si vous créez un tag `rdv_pris` dans CRM, vous pouvez aussi filtrer :

- `Etiquettes` → `ne contient pas` → `rdv_pris`

Cela arrêtera les emails pour les leads qui ont pris rendez-vous.

---

## Etape 4 : Paramètres des templates d'email

Pour chaque email, dans l'éditeur de campagne :

1. **Expéditeur** : `MFinances <contact@mfinances.be>` (ou l'adresse configurée)
2. **Répondre à** : `contact@mfinances.be`
3. **Design** : Utiliser le builder email Odoo, appliquer la charte graphique :
   - Couleur primaire (boutons, titres) : `#124d5a`
   - Couleur accent (highlights) : `#f0c324`
   - Police : Arial ou Helvetica
4. **Footer** : Inclure un lien de désinscription (obligatoire RGPD)
5. **Variables dynamiques** :
   - `{{ object.contact_name }}` → prénom du lead
   - `{{ object.description }}` → résultat personnalisé de l'outil (HTML)
   - `{{ object.email_from }}` → email du lead

---

## Etape 5 : Tester

1. **Créer un lead test** avec le tag `seq_diagnostic_tresorerie`
2. **Vérifier** que la campagne le détecte (onglet "Participants" de la campagne)
3. **Lancer** la campagne en mode test si disponible
4. **Vérifier** la réception du J0
5. **Répéter** pour les 3 autres campagnes

### Test depuis le site

1. Aller sur `https://mfinances.be/diagnostic/`
2. Remplir le diagnostic, entrer un email test
3. Vérifier dans Odoo CRM qu'un lead apparaît avec le tag `seq_diagnostic_tresorerie`
4. Vérifier que Marketing Automation a inscrit ce lead dans la campagne A

---

## Etape 6 : Activer l'engine Odoo

Une fois les 4 campagnes configurées et testées :

1. Aller dans **Supabase Dashboard** → **Edge Functions** → **Secrets**
2. Ajouter ou modifier le secret :
   ```
   EMAIL_ENGINE = odoo
   ```
3. Ajouter les secrets d'authentification API :
   ```
   ODOO_API_URL        = https://api-connect-odoo.vercel.app/api
   ODOO_API_SIGNATURE  = 746b22e105d43521fc87e9ebc40fa1f88524855a7b54a311c4c3a37bcfec886a
   ODOO_API_CLIENT_ID  = client_mfinances
   ODOO_API_COMPANY_ID = 3
   ```

> Tant que `EMAIL_ENGINE` est absent ou vaut `supabase`, c'est le moteur Supabase qui gère les emails. Pas de risque de casser ce qui fonctionne.

---

## Résumé de l'architecture

```
┌────────────────────────────────┐
│     Site mfinances.be          │
│                                │
│  Outil → submitLead()          │──→ api-connect-odoo → crm.lead (pipeline)
│        → enrollSequence()      │──→ edge function enroll-sequence
│                                │         │
└────────────────────────────────┘         │
                                           ▼
                                    ┌──────────────┐
                                    │ EMAIL_ENGINE? │
                                    └──────┬───────┘
                                           │
                              ┌────────────┼────────────┐
                              ▼                         ▼
                        supabase                      odoo
                    (emails par Supabase)     (tag CRM → Marketing Automation)
                                                        │
                                                        ▼
                                              api-connect-odoo
                                              POST /api/leads
                                              + tag_names: ["seq_X"]
                                                        │
                                                        ▼
                                              Odoo CRM → Lead + tag
                                                        │
                                                        ▼
                                              Marketing Automation
                                              filtre sur tag → 5 emails
```

---

## Tableau récapitulatif des 20 emails

| Séq. | Email | Envoi | Objet                                    | CTA              | Arrêt si RDV | Déclenche |
| ----- | ----- | ----- | ---------------------------------------- | ---------------- | :-----------: | ---------- |
| A     | A1    | J0    | Diagnostic prêt — résultats et pistes | Bouton RDV       |      oui      | —         |
| A     | A2    | J+2   | Ce que les chiffres ne disent pas        | —               |      oui      | —         |
| A     | A3    | J+7   | PME de Liège — rupture de trésorerie  | Bouton RDV       |      oui      | —         |
| A     | A4    | J+14  | Outil complémentaire                    | Lien Calculateur |      non      | Séq. C    |
| A     | A5    | J+30  | Je reste disponible                      | Bouton RDV       |      oui      | Newsletter |
| B     | B1    | J0    | Bail prêt                               | —               |      oui      | —         |
| B     | B2    | J+2   | 3 erreurs coûteuses                     | —               |      oui      | —         |
| B     | B3    | J+7   | Bail et fiscalité                       | Bouton RDV       |      oui      | —         |
| B     | B4    | J+14  | Aller plus loin                          | Lien Checklist   |      non      | Séq. D    |
| B     | B5    | J+30  | Si situation a évolué                  | Bouton RDV       |      oui      | Newsletter |
| C     | C1    | J0    | Estimation dispo                         | Bouton RDV       |      oui      | —         |
| C     | C2    | J+2   | Ce que le calculateur ne mesure pas      | —               |      oui      | —         |
| C     | C3    | J+7   | Déductions oubliées                    | Bouton RDV       |      oui      | —         |
| C     | C4    | J+14  | Récupérer 4 200 €                     | Bouton RDV       |      oui      | —         |
| C     | C5    | J+30  | Dernier message                          | Bouton RDV       |      oui      | Newsletter |
| D     | D1    | J0    | 20 points essentiels                     | Bouton RDV       |      oui      | —         |
| D     | D2    | J+2   | 3 points négligés                      | —               |      oui      | —         |
| D     | D3    | J+7   | Se préparer en 4 étapes                | Bouton RDV       |      oui      | —         |
| D     | D4    | J+14  | Complément utile                        | Lien Diagnostic  |      non      | Séq. A    |
| D     | D5    | J+30  | Je reste à disposition                  | Bouton RDV       |      oui      | Newsletter |

---

## Liens croisés entre outils

| Email     | Campagne source        | Lien vers                                                      |
| --------- | ---------------------- | -------------------------------------------------------------- |
| A4 (J+14) | Diagnostic Trésorerie | `https://mfinances.be/ressources/calculateur-bureau/`        |
| B4 (J+14) | Générateur Bail      | `https://mfinances.be/ressources/checklist-controle-bureau/` |
| D4 (J+14) | Checklist Fiscale      | `https://mfinances.be/diagnostic/`                           |

Quand un visiteur arrive via un lien croisé et soumet son email, un **nouveau lead** est créé avec le tag de la nouvelle séquence. Les deux campagnes tournent en parallèle.

## Lien de prise de rendez-vous

Dans tous les emails avec CTA bouton, utiliser :

```
https://odoo.mfinances.be/appointment/11
```

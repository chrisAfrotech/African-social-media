CREATE TEMPORARY TABLE TEMPTAB
SELECT id,nom,image, somme
FROM (
SELECT id, nom, image, SUM(total) as somme FROM
( SELECT Personne.id, Personne.image, nom, SUM(point) as total
  FROM Personne, ReactionPublication, Publication
  WHERE Publication.personne_publication = Personne.id
  AND ReactionPublication.publication = Publication.id_publication
  AND Publication.type REGEXP '.+'
  GROUP BY Publication.personne_publication
UNION
SELECT Personne.id, nom,Personne.image, SUM(point) as total
  FROM Personne, ReactionCommentaire, Commentaire
  WHERE Commentaire.personne = Personne.id
  AND ReactionCommentaire.commentaire = Commentaire.id_commentaire
  AND Commentaire.type REGEXP '.+'
  GROUP BY Commentaire.personne 
UNION
SELECT Personne.id,nom,Personne.image, SUM(point) as total
  FROM Personne, ReactionComOfCom, CommentOfComment
  WHERE CommentOfComment.personne = Personne.id
  AND ReactionComOfCom.comOfCom = CommentOfComment.id_commentaire
  AND CommentOfComment.type REGEXP '.+'
  GROUP BY CommentOfComment.personne
)
as result
GROUP BY id) as result1;